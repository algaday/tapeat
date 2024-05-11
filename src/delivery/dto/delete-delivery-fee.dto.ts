import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteDeliveryFeeDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
