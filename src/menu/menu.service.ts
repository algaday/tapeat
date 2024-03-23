import { Injectable } from '@nestjs/common';

import { RestaurantService } from 'src/restaurant/restaurant.service';
import { AuthUser } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuItemDto, ModificationGroupDto } from './dto';

@Injectable()
export class MenuService {
  menuId: number;
  constructor(
    private restaurantService: RestaurantService,
    private prisma: PrismaService,
  ) {}
  async createMenuItem(dto: CreateMenuItemDto, userInfo: AuthUser) {
    const { name, category, description, image, price, modificationGroups } =
      dto;
    const restaurant =
      await this.restaurantService.getRestaurantByOwnerId(userInfo);

    const menuItem = await this.prisma.menuItem.create({
      data: {
        nameOfDish: name,
        category,
        description,
        image,
        price,
        restaurantId: restaurant.id,
      },
    });

    this.menuId = menuItem.id;

    if (modificationGroups?.length === 0) {
      return menuItem;
    }

    const menuItemWithModifications =
      await this.addMenuItemModificationGroups(modificationGroups);

    return menuItemWithModifications;
  }

  async addMenuItemModificationGroups(
    modificationGroups: ModificationGroupDto[],
  ) {
    for (const modification of modificationGroups) {
      const modificationItem = await this.prisma.modificationGroup.create({
        data: {
          name: modification.name,
          menuItemId: this.menuId,
        },
      });

      await this.prisma.modification.createMany({
        data: modification.options.map((modificationOptionItem) => ({
          name: modificationOptionItem.name,
          price: modificationOptionItem.price,
          modificationGroupId: modificationItem.id,
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
