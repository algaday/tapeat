import { Inject, Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { translateUnit } from 'src/core/infra/utils';
import { IngredientRepository } from 'src/ingredient/ingredient.repository';
import { InventoryCountTemplateRepositoryPort } from 'src/inventory-count-template/domain/inventory-count-template-repository.port';
import { InventoryCountTemplateNotFoundError } from 'src/inventory-count-template/errors/inventory-count-template-not-found.error';
import { InventoryCountEntity } from 'src/inventory-count/domain/inventory-count.entity';
import { RestaurantBranchService } from 'src/restaurant-branch/restaurant-branch.service';
import { TelegramChatRepositoryPort } from 'src/telegram-chat/domain/telegram-chat-repository.port';
import { Telegraf } from 'telegraf';

export type NotifyInventoryCountByTelegramParams = {
  inventoryCount: InventoryCountEntity;
};

@Injectable()
export class NotificationApplicationService {
  constructor(
    @Inject(TelegramChatRepositoryPort)
    private telegramChatRepository: TelegramChatRepositoryPort,
    @Inject(InventoryCountTemplateRepositoryPort)
    private inventoryCountTemplateRepository: InventoryCountTemplateRepositoryPort,
    private restaurantBranchService: RestaurantBranchService, // TODO: use repository later
    @InjectBot() private readonly bot: Telegraf, // TODO: move to telegram module
    private readonly ingredientRepository: IngredientRepository,
  ) {}

  async notifyInventoryCountByTelegram({
    inventoryCount,
  }: NotifyInventoryCountByTelegramParams) {
    const inventoryCountTemplate =
      await this.inventoryCountTemplateRepository.findById(
        inventoryCount.getProps().inventoryCountTemplateId,
      );

    if (!inventoryCountTemplate) {
      throw new InventoryCountTemplateNotFoundError();
    }

    const telegramChat =
      await this.telegramChatRepository.findByRestaurantBranchId(
        inventoryCountTemplate.getProps().branchId,
      );

    if (!telegramChat) {
      console.warn(
        `No telegram chat was found for branch ${inventoryCountTemplate.getProps().branchId}`,
      );
      return;
    }

    const restaurantBranch = await this.restaurantBranchService.getById(
      inventoryCountTemplate.getProps().branchId,
    );

    await this.bot.telegram.sendMessage(
      telegramChat.getProps().chatIdAtTelegram,
      await this.generateInventoryCountMessage({
        inventoryCount,
        templateName: inventoryCountTemplate.getProps().name,
        branchAddress: restaurantBranch.address,
      }),
      {
        parse_mode: 'Markdown',
      },
    );
  }

  private async generateInventoryCountMessage(params: {
    inventoryCount: InventoryCountEntity;
    templateName: string;
    branchAddress: string;
  }) {
    const inventoryCountItems =
      params.inventoryCount.getProps().inventoryCountItems;

    const ingredients = await this.ingredientRepository.findByIds(
      inventoryCountItems.map((item) => item.getProps().itemId),
    );

    const inventoryCountTemplate =
      await this.inventoryCountTemplateRepository.findById(
        params.inventoryCount.getProps().inventoryCountTemplateId,
      );

    const ingredientThresholds = new Map(
      ingredients.map((ingredient) => [
        ingredient.id,
        ingredient.minQuantityThreshold?.toNumber(),
      ]),
    );

    const groupedItems = inventoryCountItems.reduce((groups, item) => {
      const storageName = item.getProps().storageName || 'Неизвестный склад';
      const threshold = ingredientThresholds.get(item.getProps().itemId);
      const quantity = Number(item.getProps().quantity);

      if (threshold !== undefined && quantity < threshold) {
        if (!groups[storageName]) {
          groups[storageName] = [];
        }
        groups[storageName].push(item);
      }

      return groups;
    }, {});

    const sortedStorageNames = Object.keys(groupedItems).sort((a, b) =>
      a.localeCompare(b),
    );

    const groupedMessage = sortedStorageNames.map((storageName) => {
      const items = groupedItems[storageName].sort((a, b) => {
        const nameA =
          ingredients.find((i) => i.id === a.getProps().itemId)?.name || '';
        const nameB =
          ingredients.find((i) => i.id === b.getProps().itemId)?.name || '';
        return nameA.localeCompare(nameB);
      });

      const itemsList = items
        .map((item) => {
          const ingredient = ingredients.find(
            (i) => i.id === item.getProps().itemId,
          );
          const threshold = ingredientThresholds.get(item.getProps().itemId);
          const quantity = Number(item.getProps().quantity);
          const minPurchase = Math.max(threshold - quantity, 0);

          return `⚠️ **${ingredient?.name || 'Неизвестный ингредиент'}**: *${quantity} ${translateUnit(ingredient?.unit)}* (Порог: *${threshold} ${translateUnit(ingredient?.unit)}*, Минимум закуп: *${minPurchase} ${translateUnit(ingredient?.unit)}*)`;
        })
        .join('\n');

      return `📦 *Склад*: **${storageName}**\n${itemsList}`;
    });

    const staffName = params.inventoryCount.getProps().staffName;
    const inventoryCountLink = `${process.env.FRONTEND_HOST}/restaurants/${inventoryCountTemplate.getProps().branchId}/inventory-counts/${params.inventoryCount.getId()}`;

    const header =
      `📊 *Отчет остатка* "${params.templateName}"\n` +
      `📍 *Филиал*: ${params.branchAddress}\n` +
      `👨‍🍳 *Ответственный сотрудник*: ${staffName}\n`;

    const finalMessage = groupedMessage.length
      ? `${header}\n🚨 *Ингредиенты ниже минимального порога*:\n\n${groupedMessage.join('\n\n')}\n\n[📥 Посмотреть полный отчет в системе](${inventoryCountLink})`
      : `${header}\n✅ Все ингредиенты находятся в норме.\n\n[📥 Посмотреть полный отчет в системе](${inventoryCountLink})`;

    return finalMessage;
  }
}
