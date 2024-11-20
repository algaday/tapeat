import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramConfig } from 'src/config/telegram.config';
import { TelegramBotService } from './telegram-bot.service';
import { NotificationSubscriptionCodeModule } from 'src/notification-subscription-code/infra/framework/notification-subscription-code.module';
import { TelegramChatModule } from 'src/telegram-chat/infra/framework/telegram-chat.module';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: TelegramConfig.TELEGRAM_BOT_TOKEN,
    }),
    NotificationSubscriptionCodeModule,
    TelegramChatModule,
  ],
  controllers: [],
  providers: [TelegramBotService],
})
export class TelegramModule {}
