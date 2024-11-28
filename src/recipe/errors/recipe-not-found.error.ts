import { DomainError } from 'src/core/domain/domain-error.base';

export class RecipeNotFoundError extends DomainError {
  code: string = 'RECIPE.NOT_FOUND';
}
