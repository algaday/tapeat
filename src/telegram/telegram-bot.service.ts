import { Injectable } from '@nestjs/common';
import { Start, Update } from 'nestjs-telegraf';
import { NotificationSubscriptionCodeApplicationService } from 'src/notification-subscription-code/application/services/notification-subscription-code.application-service';
import { Context } from 'telegraf';

@Injectable()
@Update()
export class TelegramBotService {
  constructor(
    private notificationSubscriptionCodeApplicationService: NotificationSubscriptionCodeApplicationService,
  ) {}

  @Start()
  async onStartCommand(ctx: Context) {
    const subscriptionCode =
      await this.notificationSubscriptionCodeApplicationService.createTelegramSubscriptionCode(
        ctx.chat.id.toString(),
      );
    await ctx.reply(
      `Для того чтобы активировать уведомление, укажите код ${subscriptionCode.getProps().secretCode} в настройках ресторана`,
    );
  }
}
