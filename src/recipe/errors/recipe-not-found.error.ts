import { DomainError } from 'src/core/domain/domain-error.base';

export class RecipeNotFoundError extends DomainError {
  code: string = 'recipe_not_found';
}
