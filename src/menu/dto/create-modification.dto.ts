import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ModificationGroupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => Modification)
  options: Modification[];
}

class Modification {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  price: number;
}

export class CreateModificationDto {
  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => ModificationGroupDto)
  @IsNotEmpty()
  modificationGroups: ModificationGroupDto[];
}
