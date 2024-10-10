import { DomainError } from 'src/core/domain/domain-error.base';

export class RecipeIngredientNotEnoughError extends DomainError {
  code: string = 'RECIPE-INGREDIENT.NOT_ENOUGH';
}
