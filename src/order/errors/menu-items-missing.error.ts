import { ApplicationError } from 'src/errors';

export class MenuItemsMissingError extends ApplicationError {
  message = 'Таких блюд не существует!';
}
