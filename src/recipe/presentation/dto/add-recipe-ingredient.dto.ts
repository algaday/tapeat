import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RecipeIngredientType } from 'src/recipe/domain/recipe-ingredient.entity';

export class AddRecipeIngredientDto {
  @IsString()
  @IsNotEmpty()
  recipeId: string;

  @IsString()
  @IsNotEmpty()
  recipeIngredientId: string;

  @IsEnum(RecipeIngredientType)
  @IsNotEmpty()
  type: RecipeIngredientType;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
