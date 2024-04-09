import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class RestaurantBranchDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  address: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  restaurantId: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  createdAt: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  updatedAt: string;
}
