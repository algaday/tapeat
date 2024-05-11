import { ApplicationError } from 'src/errors';

export class DeliveryFeeMismatchError extends ApplicationError {
  message = 'Сумма доставки неправильная!';
}
