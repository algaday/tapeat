import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Unit } from 'src/constants/enums/unit.enum';
import {
  InventoryCountItemType,
  InventoryCountStatus,
} from 'src/inventory-count/domain/inventory-count.entity';

export class InventoryCountDto {
  @IsString()
  id: string;

  @IsString()
  staffName: string;

  @IsEnum(InventoryCountStatus)
  status: InventoryCountStatus;

  @IsString()
  branchName: string;

  @IsString()
  createdAt: string;

  @IsString()
  templateName: string;
}

export class InventoryCountExtendedDto extends InventoryCountDto {
  @ValidateNested({ each: true })
  @Type(() => InventoryCountStorageDto)
  storages: InventoryCountStorageDto[];
}

export class InventoryCountStorageDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @ValidateNested({ each: true })
  @Type(() => InventoryCountItemDto)
  items: InventoryCountItemDto[];
}

export class InventoryCountItemDto {
  @IsString()
  id: string;

  @IsEnum(InventoryCountItemType)
  type: InventoryCountItemType;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsString()
  storageName: string;

  @IsString()
  name: string;

  @IsEnum(Unit)
  unit: Unit;
}
