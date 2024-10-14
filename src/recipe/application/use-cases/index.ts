import { CreateRecipeUseCase } from './create-recipe/create-recipe.use-case';
import { UpdateRecipeUseCase } from './update-recipe/update-recipe.use-case';
import { GetRecipeUseCase } from './get-recipe/get-recipe.use-case';
import { DeleteRecipeUseCase } from './delete-recipe/delete-recipe.use-case';
import { AddRecipeIngredientsUseCase } from './add-recipe-ingredients/add-recipe-ingredient.use-case';
import { RecipeItemService } from '../services/recipe-item.service';

export const RECIPE_USE_CASES = [
  CreateRecipeUseCase,
  UpdateRecipeUseCase,
  GetRecipeUseCase,
  DeleteRecipeUseCase,
  AddRecipeIngredientsUseCase,
];
export const RECIPE_APPLICATION_SERVICES = [RecipeItemService];
