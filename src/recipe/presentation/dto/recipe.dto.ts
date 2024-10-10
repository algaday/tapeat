import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Unit } from 'src/constants/enums/unit.enum';
import { RecipeIngredientType } from 'src/recipe/domain/recipe-ingredient.entity';

export class RecipeDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Unit)
  @IsNotEmpty()
  unit: Unit;

  @IsNumber({ maxDecimalPlaces: 4 })
  yield: number;

  @IsBoolean()
  isAvailableInInventory: boolean;

  @ValidateNested()
  @IsOptional()
  @Type(() => RecipeIngredientDto)
  recipeIngredients?: RecipeIngredientDto[];
}

export class RecipeIngredientDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(RecipeIngredientType)
  type: RecipeIngredientType;

  @IsNumber()
  quantity: number;
}
