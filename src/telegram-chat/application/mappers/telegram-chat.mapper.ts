import { Injectable } from '@nestjs/common';
import { TelegramChatDbRecord } from '../../infra/repository/prisma-telegram-chat-repository.adapter';
import {
  TelegramChatType,
  TelegramChatEntity,
} from '../../domain/telegram-chat.entity';

@Injectable()
export class TelegramChatMapper {
  toPersistence(entity: TelegramChatEntity): TelegramChatDbRecord {
    const props = entity.getProps();

    return {
      id: props.id,
      restaurantBranchId: props.restaurantBranchId,
      chatIdAtTelegram: props.chatIdAtTelegram,
      chatType: props.chatType,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }

  toDomain(record: TelegramChatDbRecord): TelegramChatEntity {
    return new TelegramChatEntity({
      id: record.id,
      props: {
        restaurantBranchId: record.restaurantBranchId,
        chatIdAtTelegram: record.chatIdAtTelegram,
        chatType: record.chatType as TelegramChatType,
      },
    });
  }
}
