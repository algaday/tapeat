import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInventoryCountDto {
  @IsString()
  @IsNotEmpty()
  inventoryCountTemplateId: string;

  @IsString()
  @IsOptional()
  staffName: string;
}
