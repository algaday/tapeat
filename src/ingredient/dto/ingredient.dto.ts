import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IngredientUnit } from 'src/constants/enums/ingredient-unit.enum';

export class IngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(IngredientUnit)
  @IsNotEmpty()
  unit: IngredientUnit;

  @IsNumber({ maxDecimalPlaces: 4 })
  yield: number;
}
