import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantDto } from './dto';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}
  async createRestaurant(dto: RestaurantDto, user: AuthUser) {
    const { name } = dto;

    const restaurant = await this.prisma.restaurant.create({
      data: {
        name,
        ownerId: user.id,
      },
    });

    return restaurant;
  }

  async getRestaurantByOwnerId(user: AuthUser) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { ownerId: user.id },
    });
    return restaurant;
  }

  async getRestaurantBranches(restaurantId: string) {
    return await this.prisma.restaurantBranch.findMany({
      where: { restaurantId },
    });
  }
}
