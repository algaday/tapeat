import { Inject, Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
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

    const ingredientThresholds = new Map(
      ingredients.map((ingredient) => [
        ingredient.id,
        ingredient.minQuantityThreshold?.toNumber(),
      ]),
    );

    const itemsUnderThreshold = inventoryCountItems.filter((item) => {
      const threshold = ingredientThresholds.get(item.getProps().itemId);
      return (
        Number(item.getProps().quantity) <
        (threshold !== undefined ? Number(threshold) : Infinity)
      );
    });

    const header = `📊 *Отчет остатка* "${params.templateName}"\n📍 *Филиал*: ${params.branchAddress}\n`;

    if (itemsUnderThreshold.length === 0) {
      return `${header}\n✅ Все ингредиенты находятся в норме.`;
    }

    const itemsList = itemsUnderThreshold
      .map((item) => {
        const ingredient = ingredients.find(
          (i) => i.id === item.getProps().itemId,
        );
        const threshold = ingredientThresholds.get(item.getProps().itemId);
        const minPurchase =
          threshold !== undefined
            ? threshold - Number(item.getProps().quantity)
            : 0;
        return `⚠️ *${ingredient?.name || 'Неизвестный ингредиент'}*: ${item.getProps().quantity} г (Порог: ${threshold ?? 'нет'}, минимум закуп: ${minPurchase} г)`;
      })
      .join('\n');

    return `${header}\n🚨 *Ингредиенты ниже минимального порога*:\n${itemsList}`;
  }
}
