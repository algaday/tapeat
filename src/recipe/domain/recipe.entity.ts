import { Unit } from 'src/constants/enums/unit.enum';
import { Entity } from 'src/core/domain/entity.base';
import { RecipeIngredientEntity } from './recipe-ingredient.entity';

interface RecipeProps {
  name: string;
  unit: Unit;
  yield: number;
  isAvailableInInventory?: boolean;
  recipeIngredients?: RecipeIngredientEntity[];
  recipeSubRecipes?: RecipeIngredientEntity[];
}

export class RecipeEntity extends Entity<RecipeProps> {
  static create(props: RecipeProps) {
    return new RecipeEntity({ props });
  }

  getIngredients(): RecipeIngredientEntity[] {
    return (
      this.props.recipeIngredients?.filter((item) => item.isIngredient()) ?? []
    );
  }

  getSubRecipes(): RecipeIngredientEntity[] {
    return (
      this.props.recipeIngredients?.filter((item) => item.isRecipe()) ?? []
    );
  }
  addRecipeIngredient(ingredient: RecipeIngredientEntity): void {
    if (!this.props.recipeIngredients) {
      this.props.recipeIngredients = [];
    }

    this.props.recipeIngredients.push(ingredient);
  }
}
