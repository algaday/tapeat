import { Inject, Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { NotificationSubscriptionCodeApplicationService } from 'src/notification-subscription-code/application/services/notification-subscription-code.application-service';
import { RestaurantBranchService } from 'src/restaurant-branch/restaurant-branch.service';
import { TelegramChatRepositoryPort } from 'src/telegram-chat/domain/telegram-chat-repository.port';
import {
  TelegramChatEntity,
  TelegramChatType,
} from 'src/telegram-chat/domain/telegram-chat.entity';
import { Telegraf } from 'telegraf';

type CreateChatParams = {
  secretCode: string;
  restaurantBranchId: string;
};

@Injectable()
export class TelegramChatApplicationService {
  constructor(
    @Inject(TelegramChatRepositoryPort)
    private readonly telegramChatRepository: TelegramChatRepositoryPort,
    private readonly notificationSubscriptionCodeApplicationService: NotificationSubscriptionCodeApplicationService,
    private readonly restaurantBranchService: RestaurantBranchService,
    @InjectBot() private readonly bot: Telegraf, // TODO: move to telegram module
  ) {}

  async createBySubscriptionSecretCode(params: CreateChatParams) {
    const branch = await this.restaurantBranchService.getById(
      params.restaurantBranchId,
    );

    if (!branch) {
      throw new Error('Branch not found');
    }

    return this.telegramChatRepository.transaction(async () => {
      const subscriptionCode =
        await this.notificationSubscriptionCodeApplicationService.activateBySecretCode(
          params.secretCode,
        );

      const telegramChat = TelegramChatEntity.create({
        chatIdAtTelegram: subscriptionCode.getProps().chatIdAtTelegram,
        restaurantBranchId: params.restaurantBranchId,
        chatType: TelegramChatType.GROUP, // TODO: IT IS HARDCODED, MAKE DYNAMIC
      });

      await this.telegramChatRepository.create(telegramChat);

      await this.notifySubscribed(
        telegramChat.getProps().chatIdAtTelegram,
        branch.address,
      ).catch(console.error);

      return telegramChat;
    });
  }

  private async notifySubscribed(chatIdAtTelegram: string, branchName: string) {
    await this.bot.telegram.sendMessage(
      chatIdAtTelegram,
      `Вы подписались на уведомление филиала ${branchName}`,
      {
        parse_mode: 'Markdown',
      },
    );
  }
}
