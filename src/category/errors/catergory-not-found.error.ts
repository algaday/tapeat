import { ApplicationError } from 'src/errors';

export class CategoryNotFoundError extends ApplicationError {
  message = 'Категория не найдена!';
}
