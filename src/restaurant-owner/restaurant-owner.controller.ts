import { Body, Controller, Post, Res } from '@nestjs/common';
import { RestaurantOwnerService } from './restaurant-owner.service';
import { UserDto } from 'src/user/dto';
import { Response } from 'express';

@Controller('restaurant-owner')
export class RestaurantOwnerController {
  constructor(private restaurantOwnerService: RestaurantOwnerService) {}

  @Post('signup')
  async restaurantOwnerSignup(
    @Body() dto: UserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } =
      await this.restaurantOwnerService.restaurantOwnerSignup(dto);

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    res.cookie('token', accessToken, {
      httpOnly: true,
      expires: expirationDate,
    });
  }
}
