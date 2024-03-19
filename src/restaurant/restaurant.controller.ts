import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantDto } from './dto';
import { GetCurrentUser, UserInfo } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guards/jwt-guard';

@UseGuards(JwtGuard)
@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}
  @Post('create')
  createRestaurant(
    @Body() dto: RestaurantDto,
    @GetCurrentUser() userInfo: UserInfo,
  ) {
    return this.restaurantService.createRestaurant(dto, userInfo);
  }

  // @Get('info')
  // getRestaurantInfo(@GetCurrentUser() userInfo: UserInfo) {
  //   return this.restaurantService.getRestaurantInfo(userInfo);
  // }
}
