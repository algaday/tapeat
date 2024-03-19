import { Injectable } from '@nestjs/common';
import { RestaurantDto } from './dto';
import { UserInfo } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}
  async createRestaurant(dto: RestaurantDto, userInfo: UserInfo) {
    const { name, address } = dto;

    const restaurantCreated = await this.prisma.restaurant.create({
      data: {
        name,
        address,
        ownerId: userInfo.id,
      },
    });
    console.log(restaurantCreated);

    return 'Hello Algaday restaurant owner';
  }
}
