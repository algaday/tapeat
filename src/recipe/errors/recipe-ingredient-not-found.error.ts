import { DomainError } from 'src/core/domain/domain-error.base';

export class RecipeIngredientNotFoundError extends DomainError {
  code: string = 'RECIPE_INGREDIENT.NOT_FOUND';
}
