import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Unit } from 'src/constants/enums/unit.enum';

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
}
