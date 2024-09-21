import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStorageBodyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  restaurantBranchId: string;
}
