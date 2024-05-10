import { ApplicationError } from 'src/errors';

export class MenuItemsNotFoundError extends ApplicationError {
  message = 'Не удалось получить список блюд!';
}
