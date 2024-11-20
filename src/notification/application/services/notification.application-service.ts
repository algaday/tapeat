import { Inject, Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { TelegramChatRepositoryPort } from 'src/telegram-chat/domain/telegram-chat-repository.port';
import { Telegraf } from 'telegraf';

@Injectable()
export class NotificationApplicationService {
  constructor(
    @Inject(TelegramChatRepositoryPort)
    private telegramChatRepository: TelegramChatRepositoryPort,
    @InjectBot() private readonly bot: Telegraf, // TODO: move to telegram module
  ) {}

  async notifyInventoryCountByTelegram(
    restaurantBranchId: string,
    // inventoryCount: InventoryCountEntity,
  ) {
    const telegramChat =
      await this.telegramChatRepository.findByRestaurantBranchId(
        restaurantBranchId,
      );

    if (!telegramChat) {
      console.warn(
        `No telegram chat was found for branch ${restaurantBranchId}`,
      );
    }

    await this.bot.telegram.sendMessage(
      telegramChat.getProps().chatIdAtTelegram,
      `Inventory count template ${telegramChat.getId()}`,
    );
  }
}
