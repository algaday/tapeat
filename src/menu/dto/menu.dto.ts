import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class Variation {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsArray()
  @ValidateNested()
  @Type(() => VariationOptions)
  options: VariationOptions[];
}

class VariationOptions {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  price: number;
}

export class MenuDto {
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
  @Type(() => Variation)
  variation?: Variation[];
}
