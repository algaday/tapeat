import { ApplicationError } from 'src/errors';

export class PriceNotMatchError extends ApplicationError {
  message = 'Цены не совпадают!';
}
