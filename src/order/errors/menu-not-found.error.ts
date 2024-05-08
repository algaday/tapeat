import { ApplicationError } from 'src/errors';

export class MenuModificationNotFound extends ApplicationError {
  message = 'Блюдо или модификация не найдено';
}
