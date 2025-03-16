import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Unit } from 'src/constants/enums/unit.enum';
import { InventoryCountTemplateType } from 'src/inventory-count-template/domain/inventory-count-template.entity';

export class TemplateStoragesWithItemsDto {
  @IsString()
  id: string;

  @IsEnum(InventoryCountTemplateType)
  type: InventoryCountTemplateType;

  @IsString()
  branchName: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplateStorageDto)
  storages: TemplateStorageDto[];
}

class TemplateStorageDto {
  @IsString()
  id: string;

  @IsString()
  storageId: string;

  @IsString()
  inventoryCountTemplateId: string;

  @ValidateNested()
  @Type(() => StorageDto)
  storage: StorageDto;
}

class StorageDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}

class ItemDto {
  @IsString()
  id: string;

  @IsString()
  storageId: string;

  @IsOptional()
  @IsString()
  ingredientId: string | null;

  @IsOptional()
  @IsString()
  recipeId: string | null;

  @IsString()
  name: string;

  @IsEnum(Unit)
  unit: Unit;
}
