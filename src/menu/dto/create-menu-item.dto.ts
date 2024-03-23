import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
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

export class CreateMenuItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => ModificationGroupDto)
  modificationGroups?: ModificationGroupDto[];
}
