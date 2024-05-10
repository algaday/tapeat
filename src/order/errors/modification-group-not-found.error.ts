import { ApplicationError } from 'src/errors';

export class ModificationGroupNotFoundError extends ApplicationError {
  message = 'Группа модификаций не cуществует!';
}
