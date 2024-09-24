import { ApplicationError } from 'src/errors';

export class MenuItemDoesNotExist extends ApplicationError {
  message = 'Меню не существует';
}
