import { ApplicationError } from 'src/errors';

export class UserAlreadyExistsError extends ApplicationError {
  private statusCode: number;
  constructor(message) {
    super(message);
    this.name = 'UserExistsError';
    this.statusCode = 403;
  }
}
