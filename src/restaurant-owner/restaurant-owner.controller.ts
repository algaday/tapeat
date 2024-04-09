import { Body, Controller, Post, Res } from '@nestjs/common';
import { RestaurantOwnerService } from './restaurant-owner.service';
import { Response } from 'express';
import { SignUpRestaurantOwnerDto } from './dto';
import { RestaurantOwnerMapper } from './restaurant-owner.mapper';

@Controller('restaurant-owner')
export class RestaurantOwnerController {
  constructor(private restaurantOwnerService: RestaurantOwnerService) {}

  @Post('signup')
  async restaurantOwnerSignup(
    @Body() dto: SignUpRestaurantOwnerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user } =
      await this.restaurantOwnerService.restaurantOwnerSignup(dto);

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    res.cookie('token', accessToken, {
      httpOnly: true,
      expires: expirationDate,
    });

    return RestaurantOwnerMapper.toDto(user);
  }
}
