import { ApplicationError } from 'src/errors';

export class TotalAmountMismatch extends ApplicationError {
  message = 'Сумма заказа неправильная!';
}
