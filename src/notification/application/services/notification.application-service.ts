import { Inject, Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
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
      this.generateInventoryCountMessage({
        inventoryCount,
        templateName: inventoryCountTemplate.getProps().name,
        branchAddress: restaurantBranch.address,
      }),
    );
  }

  private generateInventoryCountMessage(params: {
    inventoryCount: InventoryCountEntity;
    templateName: string;
    branchAddress: string;
  }) {
    return `Отчет остатка "${params.templateName}" по филиалу "${params.branchAddress}"`;
  }
}
