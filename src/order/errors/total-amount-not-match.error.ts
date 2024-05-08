import { ApplicationError } from 'src/errors';

export class TotalAmountNotMatch extends ApplicationError {
  message = 'Сумма заказа неправильная!';
}
