import { IRepository } from 'src/core/domain/repository.interface';
import { TelegramChatEntity } from './telegram-chat.entity';

export interface TelegramChatRepositoryPort
  extends IRepository<TelegramChatEntity> {}

export const TelegramChatRepositoryPort: unique symbol = Symbol(
  'TELEGRAM_CHAT_REPOSITORY',
);
