import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class SubscribeBySecretCodeDto {
  @IsNotEmpty()
  @IsString()
  secretCode: string;

  @IsUUID()
  restaurantBranchId: string;
}
