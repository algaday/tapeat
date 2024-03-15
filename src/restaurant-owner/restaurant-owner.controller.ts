import { Body, Controller, Post } from '@nestjs/common';
import { RestaurantOwnerService } from './restaurant-owner.service';
import { UserDto } from 'src/user/dto';

@Controller('restaurant-owner')
export class RestaurantOwnerController {
  constructor(private restaurantOwnerService: RestaurantOwnerService) {}

  @Post('signup')
  restaurantOwnerSignup(@Body() dto: UserDto) {
    return this.restaurantOwnerService.restaurantOwnerSignup(dto);
  }
}
