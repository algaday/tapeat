import { IsNotEmpty, IsString } from 'class-validator';

export class CreateInventoryCountDto {
  @IsString()
  @IsNotEmpty()
  inventoryCountTemplateId: string;

  @IsString()
  staffName: string;
}
