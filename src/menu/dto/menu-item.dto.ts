import { Image, MenuItem } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export type MenuItemWithImage = MenuItem & { image: Image };

class ImageDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  restaurantId: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  imageId: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  originalPath: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  mediumThumbnailPath: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  smallThumbnailPath: string;
}

export class MenuItemWithImageDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  id: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  nameOfDish: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  category: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  description: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  price: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  restaurantId: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  createdAt: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  updatedAt: string;

  @IsNotEmptyObject()
  @IsDefined()
  @Type(() => ImageDto)
  @ValidateNested()
  image: ImageDto;
}
