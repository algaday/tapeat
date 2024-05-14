import { ApplicationError } from 'src/errors';

export class MenuItemPriceMismatchError extends ApplicationError {
  message = 'Цены не совпадают!';
}
