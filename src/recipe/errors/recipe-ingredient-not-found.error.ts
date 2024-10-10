import { DomainError } from 'src/core/domain/domain-error.base';

export class RecipeIngredientNotFoundError extends DomainError {
  code: string = 'RECIPE-INGREDIENT.NOT_FOUND';
}
