import { Inject, Injectable } from '@nestjs/common';
import { NotificationSubscriptionCodeApplicationService } from 'src/notification-subscription-code/application/services/notification-subscription-code.application-service';
import { TelegramChatRepositoryPort } from 'src/telegram-chat/domain/telegram-chat-repository.port';
import {
  TelegramChatEntity,
  TelegramChatType,
} from 'src/telegram-chat/domain/telegram-chat.entity';

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
  ) {}

  async createBySubscriptionSecretCode(params: CreateChatParams) {
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

      return telegramChat;
    });
  }
}
