import { ApplicationError } from 'src/errors';

export class UserAlreadyExistsError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'UserExistsError';
  }
}
