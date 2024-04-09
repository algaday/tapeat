import { IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from 'src/user/dto';

export class SignUpRestaurantOwnerDto extends UserDto {
  @IsString()
  @IsNotEmpty()
  restaurantName: string;
}
