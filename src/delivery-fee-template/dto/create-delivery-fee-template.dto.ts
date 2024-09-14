import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class CreateDeliveryFeeTemplatesDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => DeliveryFeeTemplate)
  deliveryFeeTemplates: DeliveryFeeTemplate[];
}

export class DeliveryFeeTemplate {
  @IsNumber()
  @IsNotEmpty()
  minOrderAmount: number;

  @IsNumber()
  @IsNotEmpty()
  deliveryFee: number;
}
