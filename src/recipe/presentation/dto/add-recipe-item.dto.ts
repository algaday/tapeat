import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RecipeItemType } from 'src/recipe/domain/recipe-item.entity';

export class AddRecipeItemDto {
  @IsString()
  @IsNotEmpty()
  recipeId: string;

  @IsString()
  @IsNotEmpty()
  recipeItemId: string;

  @IsEnum(RecipeItemType)
  @IsNotEmpty()
  type: RecipeItemType;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
