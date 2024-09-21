import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { IngredientUnit } from 'src/constants/enums/ingredient-unit.enum';

export class CreateRecipeBodyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(IngredientUnit)
  @IsNotEmpty()
  unit: IngredientUnit;

  @IsNumber({ maxDecimalPlaces: 4 })
  yield: number;

  @IsBoolean()
  isAvailableInInventory: boolean;
}
