import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantDto } from './dto';
import { GetCurrentUser, AuthUser } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guards/jwt-guard';

@UseGuards(JwtGuard)
@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}
  @Post('create')
  createRestaurant(
    @Body() dto: RestaurantDto,
    @GetCurrentUser() user: AuthUser,
  ) {
    return this.restaurantService.createRestaurant(dto, user);
  }

  @Get('info')
  getRestaurantByOwnerId(@GetCurrentUser() user: AuthUser) {
    return this.restaurantService.getRestaurantByOwnerId(user);
  }
}
