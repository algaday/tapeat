import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  modificationGroupIds?: string[];
}
