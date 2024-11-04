import { IsNumber } from 'class-validator';
import { CreateInventoryCountDto } from './create-inventory-count.dto';

export class UpdateInventoryCountDto extends CreateInventoryCountDto {}

export class UpdateInventoryCountItemDto {
  @IsNumber()
  quantity: number;
}
