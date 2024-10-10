import { Entity } from 'src/core/domain/entity.base';

export interface RecipeIngredientProps {
  ingredientId: string | null;
  subRecipeId: string | null;
  name: string;
  type: RecipeIngredientType;
  quantity: number;
}

export enum RecipeIngredientType {
  INGREDIENT = 'ingredient',
  SUB_RECIPE = 'sub-recipe',
}

export class RecipeIngredientEntity extends Entity<RecipeIngredientProps> {
  static create(props: RecipeIngredientProps) {
    return new RecipeIngredientEntity({ props });
  }

  isIngredient() {
    return this.props.type === RecipeIngredientType.INGREDIENT;
  }
  isRecipe() {
    return this.props.type === RecipeIngredientType.SUB_RECIPE;
  }

  getName(): string {
    return this.props.name;
  }

  getQuantity(): number {
    return this.props.quantity;
  }
}
