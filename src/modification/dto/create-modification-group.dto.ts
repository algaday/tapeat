import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateModificationGroupDto {
  @IsNotEmpty()
  @IsString()
  modificationGroupName: string;

  @IsDefined()
  @IsArray()
  @ValidateNested()
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
