import { ApplicationError } from 'src/errors';

export class MenuItemsListError extends ApplicationError {
  message = 'Не удалось получить список блюд!';
}
