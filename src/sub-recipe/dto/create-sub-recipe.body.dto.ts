import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSubRecipeBodyDto {
  @IsString()
  @IsNotEmpty()
  recipeId: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  ingredientId: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  subRecipeId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
