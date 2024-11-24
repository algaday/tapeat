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
  }): Promise<string> {
    const { inventoryCount, templateName, branchAddress } = params;

    const { inventoryCountItems, staffName, inventoryCountTemplateId } =
      inventoryCount.getProps();

    const [ingredients, inventoryCountTemplate] = await Promise.all([
      this.ingredientRepository.findByIds(
        inventoryCountItems.map((item) => item.getProps().itemId),
      ),
      this.inventoryCountTemplateRepository.findById(inventoryCountTemplateId),
    ]);

    if (!inventoryCountTemplate) {
      throw new InventoryCountTemplateNotFoundError();
    }

    const ingredientThresholds = new Map(
      ingredients.map((ingredient) => [
        ingredient.id,
        ingredient.minQuantityThreshold.toNumber(),
      ]),
    );

    const groupedItems = inventoryCountItems.reduce<Record<string, string[]>>(
      (groups, item) => {
        const {
          storageName = 'Неизвестный склад',
          itemId,
          quantity,
        } = item.getProps();
        const threshold = ingredientThresholds.get(itemId);

        if (quantity < threshold) {
          const ingredient = ingredients.find((i) => i.id === itemId);
          const minPurchase = Math.max(
            0,
            parseFloat((threshold - quantity).toFixed(2)),
          );
          const unit = translateUnit(ingredient.unit);
          const itemMessage = `⚠️ **${ingredient.name}**: *${quantity} ${unit}* (Порог: *${threshold} ${unit}*, Минимум закуп: *${minPurchase} ${unit}*)`;

          if (!groups[storageName]) {
            groups[storageName] = [];
          }
          groups[storageName].push(itemMessage);
        }

        return groups;
      },
      {},
    );

    const groupedMessage = Object.entries(groupedItems)
      .map(
        ([storageName, items]) =>
          `📦 *Склад*: **${storageName}**\n${items.join('\n')}`,
      )
      .join('\n\n');

    const inventoryCountLink = `${process.env.FRONTEND_HOST}/restaurants/${inventoryCountTemplate.getProps().branchId}/inventory-counts/${inventoryCount.getId()}`;

    const header =
      `📊 *Отчет остатка* "${templateName}"\n` +
      `📍 *Филиал*: ${branchAddress}\n` +
      `👨‍🍳 *Ответственный сотрудник*: ${staffName}\n`;

    const finalMessage = groupedMessage
      ? `${header}\n🚨 *Ингредиенты ниже минимального порога*:\n\n${groupedMessage}\n\n[📥 Посмотреть полный отчет в системе](${inventoryCountLink})`
      : `${header}\n✅ Все ингредиенты находятся в норме.\n\n[📥 Посмотреть полный отчет в системе](${inventoryCountLink})`;

    return finalMessage;
  }
}
