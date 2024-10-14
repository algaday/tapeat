import { DomainError } from 'src/core/domain/domain-error.base';

export class RecipeIngredientNotFoundError extends DomainError {
  code: string = 'recipe_ingredient_not_found';
}
