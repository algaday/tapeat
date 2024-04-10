import { ApplicationError } from 'src/errors';

export class UserAlreadyExistsError extends ApplicationError {
  message = 'Пользователь уже существует';
}
