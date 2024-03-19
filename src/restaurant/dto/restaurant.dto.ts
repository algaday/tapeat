import { IsNotEmpty, IsString } from 'class-validator';

export class RestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
