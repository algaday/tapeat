import { IRepository } from 'src/core/domain/repository.interface';
import { NotificationSubscriptionCodeEntity } from './notification-subscription.entity';

export interface NotificationSubscriptionCodeRepositoryPort
  extends IRepository<NotificationSubscriptionCodeEntity> {
  findBySecretCode(
    secretCode: string,
  ): Promise<NotificationSubscriptionCodeEntity | null>;
}

export const NotificationSubscriptionCodeRepositoryPort: unique symbol = Symbol(
  'NOTIFICATION_SUBSCRIPTION_REPOSITORY',
);
