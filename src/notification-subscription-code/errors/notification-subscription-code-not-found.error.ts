import { DomainError } from 'src/core/domain/domain-error.base';

export class NotificationSubscriptionCodeNotFoundError extends DomainError {
  code = 'NOTIFICATION_SUBSCRIPTION_CODE.NOT_FOUND';
}
