import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateInventoryCountDto } from './create-inventory-count.dto';
import { Type } from 'class-transformer';
import { InventoryCountItemType } from 'src/inventory-count/domain/inventory-count.entity';

export class UpdateInventoryCountDto extends CreateInventoryCountDto {
  @ValidateNested()
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
}
