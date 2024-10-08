import { Image, Modification, Prisma } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';

type MenuItem = Prisma.MenuItemGetPayload<{
  include: {
    category: true;
    modificationGroups: {
      include: {
        modificationGroup: {
          include: {
            modifications: true;
          };
        };
      };
    };
  };
}>;

export type MenuItemWithImage = MenuItem & {
  image: Image;
};

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
  categoryId: string;

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

  @Type(() => Category)
  category: Category;

  @Type(() => ModificationGroup)
  modificationGroups?: ModificationGroup[];
}

class ModificationGroup {
  @IsNotEmpty()
  @IsString()
  @Expose()
  id: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  isMultipleChoice: boolean;
  @IsNotEmpty()
  @IsString()
  @Expose()
  modifications: Modification[];
}

class Category {
  @IsNotEmpty()
  @IsString()
  @Expose()
  id: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  restaurantId: string;
}
