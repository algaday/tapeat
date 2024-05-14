import { ApplicationError } from 'src/errors';

export class ModificationMissingError extends ApplicationError {
  message = 'Модификация не существует!';
}
