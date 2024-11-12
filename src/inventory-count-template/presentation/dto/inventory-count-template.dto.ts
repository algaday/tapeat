import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { InventoryCountTemplateType } from 'src/inventory-count-template/domain/inventory-count-template.entity';

export class InventoryCountTemplateDto {
  @IsString()
  id: string;

  @IsEnum(InventoryCountTemplateType)
  templateType: InventoryCountTemplateType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StorageDto)
  storages: StorageDto[];

  @IsString()
  @IsNotEmpty()
  name: string;
}

class StorageDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
}
