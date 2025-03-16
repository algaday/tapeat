import { DomainError } from 'src/core/domain/domain-error.base';

export class NotificationSubscriptionCodeAlreadyActivatedError extends DomainError {
  code = 'NOTIFICATION_SUBSCRIPTION_CODE.ALREADY_ACTIVATED';
}
