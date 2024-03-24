import { Injectable } from '@nestjs/common';
import { RestaurantDto } from './dto';
import { AuthUser } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}
  async createRestaurant(dto: RestaurantDto, userInfo: AuthUser) {
    const { name, address } = dto;

    const restaurant = await this.prisma.restaurant.create({
      data: {
        name,
        address,
        ownerId: userInfo.id,
      },
    });

    return restaurant;
  }

  async getRestaurantByOwnerId(userInfo: AuthUser) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { ownerId: userInfo.id },
    });
    return restaurant;
  }
}
