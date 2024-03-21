import { Injectable } from '@nestjs/common';
import { MenuDto, Variation } from './dto/menu.dto';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { UserInfo } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenuService {
  menuId: number;
  constructor(
    private restaurantService: RestaurantService,
    private prisma: PrismaService,
  ) {}
  async createMenuItem(dto: MenuDto, userInfo: UserInfo) {
    const { name, category, description, image, price, variation } = dto;
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

    this.menuId = createMenuItem.id;

    if (!variation || variation.length === 0) {
      return createMenuItem;
    }

    const createVariation = await this.addVariationToMenuItem(variation);

    return createVariation;
  }

  async addVariationToMenuItem(data: Variation[]) {
    for (let i = 0; i < data.length; i++) {
      const variant = await this.prisma.variation.create({
        data: {
          name: data[i].name,
          menuItemId: this.menuId,
        },
      });

      await this.prisma.variationChoice.createMany({
        data: data[i].options.map((item) => ({
          name: item.name,
          price: item.price,
          variationId: variant.id,
        })),
        skipDuplicates: true,
      });
    }
    return await this.prisma.menuItem.findUnique({
      where: {
        id: this.menuId,
      },
    });
  }
}
