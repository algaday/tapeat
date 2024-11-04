import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { InventoryCountItemType } from 'src/inventory-count/domain/inventory-count.entity';

export class InventoryCountDto {
  @IsString()
  id: string;

  @IsString()
  staffName: string;
}

export class InventoryCountWithStorageDto extends InventoryCountDto {
  @ValidateNested({ each: true })
  @Type(() => InventoryCountStoragesDto)
  storages: InventoryCountStoragesDto[];
}

export class InventoryCountStoragesDto {
  @IsString()
  storageName: string;

  @ValidateNested({ each: true })
  @Type(() => InventoryCountItemDto)
  inventoryCountItems: InventoryCountItemDto[];
}

export class InventoryCountItemDto {
  @IsString()
  id: string;

  @IsEnum(InventoryCountItemType)
  type: InventoryCountItemType;

  @IsNumber()
  quantity: number;

  @IsString()
  storageName: string;
}
