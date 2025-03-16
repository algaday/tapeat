import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { InventoryCountDto } from './inventory-count.dto';

export class InventoryCountBaseDto extends InventoryCountDto {
  @ValidateNested({ each: true })
  @Type(() => StorageDto)
  storages: StorageDto[];
}

export class StorageDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;
}
