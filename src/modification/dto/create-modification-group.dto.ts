import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateModificationGroupDto {
  @IsNotEmpty()
  @IsString()
  modificationGroupName: string;

  @IsNotEmpty()
  @IsBoolean()
  isMandatory: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isMultipleChoice: boolean;

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
}
