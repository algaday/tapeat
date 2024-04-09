import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators';
import { CreateBranchDto } from './dto/create-branch.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { RestaurantBranchMapper } from './restaurant-branch.mapper';

@Injectable()
export class RestaurantBranchService {
  constructor(
    private prisma: PrismaService,
    private restaurant: RestaurantService,
  ) {}
  async createBranch(dto: CreateBranchDto, user: AuthUser) {
    const restaurant = await this.restaurant.getRestaurantByOwnerId(user);
    const restaurantBranch = await this.prisma.restaurantBranch.create({
      data: {
        address: dto.address,
        restaurantId: restaurant.id,
      },
    });
    return RestaurantBranchMapper.toDto(restaurantBranch);
  }
}
