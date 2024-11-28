import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { InventoryCountTemplateType } from 'src/inventory-count-template/domain/inventory-count-template.entity';

export class CreateInventoryCountTemplateDto {
  @IsEnum(InventoryCountTemplateType)
  templateType: InventoryCountTemplateType;

  @IsString()
  @IsNotEmpty()
  branchId: string;
}
