import { Module } from '@nestjs/common';
import { PrismaTelegramChatRepositoryAdapter } from '../repository/prisma-telegram-chat-repository.adapter';
import { TelegramChatRepositoryPort } from 'src/telegram-chat/domain/telegram-chat-repository.port';
import { TelegramChatMapper } from 'src/telegram-chat/application/mappers/telegram-chat.mapper';
import { NotificationSubscriptionCodeController } from 'src/telegram-chat/presentation/notification-subscription-code.controller';
import { TelegramChatApplicationService } from 'src/telegram-chat/application/services/telegram-chat.application-service';
import { NotificationSubscriptionCodeModule } from 'src/notification-subscription-code/infra/framework/notification-subscription-code.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramConfig } from 'src/config/telegram.config';
import { RestaurantBranchModule } from 'src/restaurant-branch/restaurant-branch.module';

const REPOSITORIES = [
  {
    provide: TelegramChatRepositoryPort,
    useClass: PrismaTelegramChatRepositoryAdapter,
  },
];

@Module({
  imports: [
    NotificationSubscriptionCodeModule,
    RestaurantBranchModule,
    TelegrafModule.forRoot({
      token: TelegramConfig.TELEGRAM_BOT_TOKEN,
    }),
  ],
  controllers: [NotificationSubscriptionCodeController],
  providers: [
    TelegramChatMapper,
    TelegramChatApplicationService,
    ...REPOSITORIES,
  ],
  exports: [...REPOSITORIES],
})
export class TelegramChatModule {}
