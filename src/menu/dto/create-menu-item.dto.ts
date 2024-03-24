import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class Modification {
  @IsNotEmpty()
  @IsString()
  modificationId: string;

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
  price: string;

  @IsNotEmpty()
  @IsString()
  imageId: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => Modification)
  modifications?: Modification[];
}

export class ModificationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  group: string;
}
