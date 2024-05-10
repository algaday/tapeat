import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class InitiateOrderDto {
  @IsNotEmpty()
  @IsString()
  restaurantId: string;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  comments: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => MenuItem)
  menuItems: MenuItem[];
}

export class MenuItem {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsDefined()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ModificationGroups)
  modificationGroups: ModificationGroups[];
}

export class ModificationGroups {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsDefined()
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Modification)
  modifications: Modification[];
}

class Modification {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
