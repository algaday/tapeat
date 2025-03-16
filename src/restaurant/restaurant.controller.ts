import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthUser, GetCurrentUser } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guards/jwt-guard';
import { RestaurantDto } from './dto';
import { RestaurantService } from './restaurant.service';

//todo: rename to restaurants in future
@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  createRestaurant(
    @Body() dto: RestaurantDto,
    @GetCurrentUser() user: AuthUser,
  ) {
    return this.restaurantService.createRestaurant(dto, user);
  }

  @UseGuards(JwtGuard)
  @Get('info')
  getRestaurantByOwnerId(@GetCurrentUser() user: AuthUser) {
    return this.restaurantService.getRestaurantByOwnerId(user);
  }

  @Get(':restaurantId/branches')
  getRestaurantBranches(@Param('restaurantId') restaurantId: string) {
    return this.restaurantService.getRestaurantBranches(restaurantId);
  }
}
