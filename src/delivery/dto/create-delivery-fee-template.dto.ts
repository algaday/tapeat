import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDeliveryFeeTemplateDto {
  @IsNumber()
  @IsNotEmpty()
  minTotalPrice: number;

  @IsNumber()
  @IsNotEmpty()
  maxTotalPrice: number;

  @IsNumber()
  @IsNotEmpty()
  fee: number;
}
