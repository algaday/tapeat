import { Inject, Injectable } from '@nestjs/common';
import { NotificationSubscriptionCodeRepositoryPort } from 'src/notification-subscription-code/domain/notification-subscription-code-repository.port';
import {
  NotificationSubscriptionCodeEntity,
  NotificationSubscriptionCodeStatus,
} from 'src/notification-subscription-code/domain/notification-subscription.entity';
import {
  NotificationSubscriptionCodeAlreadyActivatedError,
  NotificationSubscriptionCodeNotFoundError,
} from 'src/notification-subscription-code/errors';

@Injectable()
export class NotificationSubscriptionCodeApplicationService {
  constructor(
    @Inject(NotificationSubscriptionCodeRepositoryPort)
    private readonly notificationSubscriptionCodeRepository: NotificationSubscriptionCodeRepositoryPort,
  ) {}

  async activateBySecretCode(secretCode: string) {
    const subscriptionCode = await this.getBySecretCode(secretCode);

    if (
      subscriptionCode.getProps().status ===
      NotificationSubscriptionCodeStatus.ACTIVATED
    ) {
      throw new NotificationSubscriptionCodeAlreadyActivatedError();
    }

    subscriptionCode.update({
      status: NotificationSubscriptionCodeStatus.ACTIVATED,
      activatedAt: new Date(),
    });

    await this.notificationSubscriptionCodeRepository.update(subscriptionCode);

    return subscriptionCode;
  }

  private async getBySecretCode(secretCode: string) {
    const subscriptionCode =
      await this.notificationSubscriptionCodeRepository.findBySecretCode(
        secretCode,
      );

    if (!subscriptionCode) {
      throw new NotificationSubscriptionCodeNotFoundError();
    }

    return subscriptionCode;
  }

  async createTelegramSubscriptionCode(telegramChatId: string) {
    const subscriptionCode = NotificationSubscriptionCodeEntity.create({
      chatIdAtTelegram: telegramChatId,
      secretCode: this.generateSecretCode(),
      status: NotificationSubscriptionCodeStatus.PENDING,
      activatedAt: null,
      expiresAt: null,
    });

    await this.notificationSubscriptionCodeRepository.create(subscriptionCode);

    return subscriptionCode;
  }

  private generateSecretCode(length: number = 12): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let secretCode = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      secretCode += characters[randomIndex];
    }

    return secretCode;
  }
}
