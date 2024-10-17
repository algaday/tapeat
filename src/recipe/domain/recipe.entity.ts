import { Unit } from 'src/constants/enums/unit.enum';
import { Entity } from 'src/core/domain/entity.base';
import { RecipeItemEntity } from './recipe-item.entity';

interface RecipeProps {
  name: string;
  unit: Unit;
  yield: number;
  isAvailableInInventory?: boolean;
  recipeItems: RecipeItemEntity[];
}

export class RecipeEntity extends Entity<RecipeProps> {
  static create(props: RecipeProps) {
    return new RecipeEntity({ props });
  }

  getIngredients(): RecipeItemEntity[] {
    return this.props.recipeItems?.filter((item) => item.isIngredient()) ?? [];
  }

  getSubRecipes(): RecipeItemEntity[] {
    return this.props.recipeItems?.filter((item) => item.isRecipe()) ?? [];
  }
  addRecipeIngredient(ingredient: RecipeItemEntity): void {
    if (!this.props.recipeItems) {
      this.props.recipeItems = [];
    }

    this.props.recipeItems.push(ingredient);
  }
}
