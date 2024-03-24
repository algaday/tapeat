import { Injectable } from '@nestjs/common';

import { RestaurantService } from 'src/restaurant/restaurant.service';
import { AuthUser } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuItemDto, ModificationGroupDto } from './dto';

@Injectable()
export class MenuService {
  constructor(
    private restaurantService: RestaurantService,
    private prisma: PrismaService,
  ) {}

  async createMenuItem(dto: CreateMenuItemDto, userInfo: AuthUser) {
    const { name, category, description, price, imageId, modificationGroups } =
      dto;
    const restaurant =
      await this.restaurantService.getRestaurantByOwnerId(userInfo);

    const menuItem = await this.prisma.menuItem.create({
      data: {
        nameOfDish: name,
        category,
        description,
        price,
        imageId,
        restaurantId: restaurant.id,
      },
    });

    await this.prisma.image.update({
      where: {
        id: imageId,
      },
      data: {
        isAssigned: true,
      },
    });

    if (modificationGroups?.length === 0) {
      return menuItem;
    }

    const menuItemWithModifications = await this.addMenuItemModificationGroups(
      modificationGroups,
      menuItem.id,
    );

    return menuItemWithModifications;
  }

  async addMenuItemModificationGroups(
    modificationGroups: ModificationGroupDto[],
    menuItemId: string,
  ) {
    for (const modification of modificationGroups) {
      const modificationItem = await this.prisma.modificationGroup.create({
        data: {
          name: modification.name,
          menuItemId,
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
        id: menuItemId,
      },
    });
  }
}
