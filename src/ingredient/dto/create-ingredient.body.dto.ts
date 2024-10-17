import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Unit } from 'src/constants/enums/unit.enum';

export class CreateIngredientBodyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Unit)
  @IsNotEmpty()
  unit: Unit;

  @IsNumber({ maxDecimalPlaces: 4 })
  yield: number;
}
