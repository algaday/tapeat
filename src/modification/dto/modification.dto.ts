import { Prisma } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class ModificationGroupDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  createdAt: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  updatedAt: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  restaurantId: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Modification)
  modifications: Modification[];
}

export class Modification {
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  modificationGroupId: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  price: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  createdAt: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  updatedAt: string;
}

export type ModificationGroupWithModifications =
  Prisma.ModificationGroupGetPayload<{
    include: { modifications: true };
  }>;
