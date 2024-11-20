import { IRepository } from 'src/core/domain/repository.interface';
import { TelegramChatEntity } from './telegram-chat.entity';

export interface TelegramChatRepositoryPort
  extends IRepository<TelegramChatEntity> {
  findByRestaurantBranchId(
    restaurantBranchId: string,
  ): Promise<TelegramChatEntity | null>;
}

export const TelegramChatRepositoryPort: unique symbol = Symbol(
  'TELEGRAM_CHAT_REPOSITORY',
);
