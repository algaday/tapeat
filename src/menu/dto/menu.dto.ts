import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

class Variation {
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

  @IsArray()
  @ValidateNested()
  @Type(() => Variation)
  variation?: Variation[];
}
