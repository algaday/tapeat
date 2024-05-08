import { IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from 'src/user/dto';

export class CreateCustomerDto extends UserDto {
  @IsString()
  @IsNotEmpty()
  address: string;
}
