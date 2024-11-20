import { Body, Controller, Post } from '@nestjs/common';
import { SubscribeBySecretCodeDto } from './dto/subscribe-by-secret-code.dto';
import { TelegramChatApplicationService } from '../application/services/telegram-chat.application-service';

@Controller('telegram-chats')
export class NotificationSubscriptionCodeController {
  constructor(
    private telegramChatApplicationService: TelegramChatApplicationService,
  ) {}

  @Post('subscribe-by-secret-code')
  async subscribeBySecretCode(@Body() dto: SubscribeBySecretCodeDto) {
    return this.telegramChatApplicationService.createBySubscriptionSecretCode(
      dto,
    );
  }
}
