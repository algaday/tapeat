import { Entity } from 'src/core/domain/entity.base';

export enum TelegramChatType {
  USER = 'user',
  GROUP = 'group',
  CHANNEL = 'channel',
}

interface Props {
  restaurantBranchId: string;
  chatIdAtTelegram: string;
  chatType: TelegramChatType;
}

export class TelegramChatEntity extends Entity<Props> {
  static create(props: Props) {
    return new TelegramChatEntity({ props });
  }
}
