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
import { RecipeItemType } from 'src/recipe/domain/recipe-item.entity';

export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Unit)
  @IsNotEmpty()
  unit: Unit;

  @IsNumber({ maxDecimalPlaces: 4 })
  yield: number;

  @IsBoolean()
  @IsOptional()
  isAvailableInInventory: boolean;

  @ValidateNested()
  @IsOptional()
  @Type(() => RecipeItemDto)
  recipeItems?: RecipeItemDto[];
}

class RecipeItemDto {
  @IsString()
  id: string;

  @IsEnum(RecipeItemType)
  type: RecipeItemType;

  @IsNumber()
  quantity: number;
}
