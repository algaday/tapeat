import { Entity } from 'src/core/domain/entity.base';

interface RecipeItemProps {
  name: string;
  type: RecipeItemType;
  quantity: number;
}

export enum RecipeItemType {
  INGREDIENT = 'ingredient',
  SUB_RECIPE = 'sub-recipe',
}

export class RecipeItemEntity extends Entity<RecipeItemProps> {
  static create(props: RecipeItemProps) {
    return new RecipeItemEntity({ props });
  }

  isIngredient() {
    return this.props.type === RecipeItemType.INGREDIENT;
  }
  isRecipe() {
    return this.props.type === RecipeItemType.SUB_RECIPE;
  }

  getName(): string {
    return this.props.name;
  }

  getQuantity(): number {
    return this.props.quantity;
  }
}
