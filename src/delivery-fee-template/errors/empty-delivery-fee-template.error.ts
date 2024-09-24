import { ApplicationError } from 'src/errors';

export class EmptyDeliveryFeeTemplateError extends ApplicationError {
  message = 'Отсутствуют данные для Шаблона цен доставки!';
}
