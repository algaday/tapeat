import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramConfig } from 'src/config/telegram.config';
import { InventoryCountTemplateModule } from 'src/inventory-count-template/infra/framework/inventory-count-template.module';
import { NotificationApplicationService } from 'src/notification/application/services/notification.application-service';
import { RestaurantBranchModule } from 'src/restaurant-branch/restaurant-branch.module';
import { TelegramChatModule } from 'src/telegram-chat/infra/framework/telegram-chat.module';

@Module({
  imports: [
    TelegramChatModule,
    TelegrafModule.forRoot({
      token: TelegramConfig.TELEGRAM_BOT_TOKEN,
    }),
    InventoryCountTemplateModule,
    RestaurantBranchModule,
  ],
  controllers: [],
  providers: [NotificationApplicationService],
  exports: [NotificationApplicationService],
})
export class NotificationModule {}
