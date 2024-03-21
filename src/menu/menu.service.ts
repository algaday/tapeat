import { Injectable } from '@nestjs/common';
import { MenuDto } from './dto/menu.dto';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { UserInfo } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenuService {
  constructor(
    private restaurantService: RestaurantService,
    private prisma: PrismaService,
  ) {}
  async createMenuItem(dto: MenuDto, userInfo: UserInfo) {
    const { name, category, description, image, price } = dto;
    const restaurant =
      await this.restaurantService.getRestaurantByOwnerId(userInfo);

    const createMenuItem = await this.prisma.menuItem.create({
      data: {
        nameOfDish: name,
        category,
        description,
        image,
        price,
        restaurantId: restaurant.id,
      },
    });
    return createMenuItem;
  }
}
