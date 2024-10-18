import { IsArray, IsEnum, IsString } from 'class-validator';
import { InventoryCountTemplateType } from 'src/inventory-count-template/domain/inventory-count-template.entity';

export class InventoryCountTemplateDto {
  @IsString()
  id: string;

  @IsEnum(InventoryCountTemplateType)
  templateType: InventoryCountTemplateType;

  @IsArray()
  storageIds: string[];
}
