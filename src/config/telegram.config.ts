import { get } from 'env-var';

export class TelegramConfig {
  public static readonly TELEGRAM_BOT_TOKEN: string = get('TELEGRAM_BOT_TOKEN')
    .required()
    .asString();
}
