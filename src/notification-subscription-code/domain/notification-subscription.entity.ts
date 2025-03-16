import { Entity } from 'src/core/domain/entity.base';

export enum NotificationSubscriptionCodeStatus {
  ACTIVATED = 'activated',
  PENDING = 'pending',
}

interface Props {
  secretCode: string;
  chatIdAtTelegram: string;
  status: NotificationSubscriptionCodeStatus;
  expiresAt: Date | null;
  activatedAt: Date | null;
}

export class NotificationSubscriptionCodeEntity extends Entity<Props> {
  static create(props: Props) {
    return new NotificationSubscriptionCodeEntity({ props });
  }
}
