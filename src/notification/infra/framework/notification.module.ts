import { Module } from '@nestjs/common';
import { NotificationApplicationService } from 'src/notification/application/services/notification.application-service';
import { TelegramChatModule } from 'src/telegram-chat/infra/framework/telegram-chat.module';

@Module({
  imports: [TelegramChatModule],
  controllers: [],
  providers: [NotificationApplicationService],
  exports: [NotificationApplicationService],
})
export class NotificationModule {}
