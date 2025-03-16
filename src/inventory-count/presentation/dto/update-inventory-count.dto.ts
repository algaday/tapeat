import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNumber } from 'class-validator';
import { InventoryCountStatus } from 'src/inventory-count/domain/inventory-count.entity';
import { CreateInventoryCountDto } from './create-inventory-count.dto';

export class UpdateInventoryCountDto extends PartialType(
  CreateInventoryCountDto,
) {
  @IsEnum(InventoryCountStatus)
  status: InventoryCountStatus;
}
export class SubmitInventoryCountDto extends PartialType(
  CreateInventoryCountDto,
) {}

export class UpdateInventoryCountItemDto {
  @IsNumber()
  quantity: number;
}
