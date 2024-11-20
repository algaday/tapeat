import { Injectable } from '@nestjs/common';
import {
  NotificationSubscriptionCodeEntity,
  NotificationSubscriptionCodeStatus,
} from 'src/notification-subscription-code/domain/notification-subscription.entity';
import { NotificationSubscriptionCodeDbRecord } from 'src/notification-subscription-code/infra/repository/prisma-notification-subscription-code-repository.adapter';

@Injectable()
export class NotificationSubscriptionCodeMapper {
  toPersistence(
    entity: NotificationSubscriptionCodeEntity,
  ): NotificationSubscriptionCodeDbRecord {
    const props = entity.getProps();

    return {
      id: props.id,
      chatIdAtTelegram: props.chatIdAtTelegram,
      status: props.status,
      secretCode: props.secretCode,
      activatedAt: props.activatedAt,
      expiresAt: props.expiresAt,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }

  toDomain(
    record: NotificationSubscriptionCodeDbRecord,
  ): NotificationSubscriptionCodeEntity {
    return new NotificationSubscriptionCodeEntity({
      id: record.id,
      props: {
        chatIdAtTelegram: record.chatIdAtTelegram,
        status: record.status as NotificationSubscriptionCodeStatus,
        secretCode: record.secretCode,
        activatedAt: record.activatedAt,
        expiresAt: record.expiresAt,
      },
    });
  }
}
