import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateModificationGroupDto {
  @IsNotEmpty()
  @IsString()
  modificationGroupName: string;

  @IsNotEmpty()
  @IsNumber()
  minimunModifierSelection: number;

  @IsNotEmpty()
  @IsNumber()
  maximumModifierSelection: number;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => Modification)
  modifications: Modification[];
}

class Modification {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  price: number;

  @IsNotEmpty()
  @IsBoolean()
  isMandatory: boolean;
}
