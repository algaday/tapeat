import { ApplicationError } from 'src/errors';

export class MenuItemMissingError extends ApplicationError {
  message = 'Нет такого блюдо!';
}
