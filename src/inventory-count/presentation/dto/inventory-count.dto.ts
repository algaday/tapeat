import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RecipeItemType } from 'src/recipe/domain/recipe-item.entity';

export class InventoryCountDto {
  @IsString()
  id: string;

  @IsString()
  staffName: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => InventoryCountItemDto)
  inventoryCountItems?: InventoryCountItemDto[];
}

export class InventoryCountItemDto {
  @IsString()
  id: string;

  @IsEnum(RecipeItemType)
  type: RecipeItemType;

  @IsNumber()
  quantity: number;
}
