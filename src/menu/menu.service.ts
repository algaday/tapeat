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

    const [menuItem] = await this.prisma.$transaction([
      this.prisma.menuItem.create({
        data: {
          nameOfDish: name,
          category,
          description,
          price,
          imageId,
          restaurantId: restaurant.id,
        },
      }),
      this.prisma.image.update({
        where: {
          id: imageId,
        },
        data: {
          isAssigned: true,
        },
      }),
    ]);

    if (modificationGroups?.length === 0) {
      return menuItem;
    }

    await this.prisma.menuItemModificationGroup.createMany({
      data: modificationGroups.map((modification) => ({
        menuItemId: menuItem.id,
        modificationId: modification,
      })),
    });

    return 'created menu with modification';
  }

  async createModificationGroup(modificationGroups: ModificationGroupDto[]) {
    for (const modificationGroup of modificationGroups) {
      const modificationGroupItem = await this.prisma.modificationGroup.create({
        data: {
          name: modificationGroup.name,
        },
      });

      await this.prisma.modification.createMany({
        data: modificationGroup.options.map((modificationOptionItem) => ({
          name: modificationOptionItem.name,
          price: modificationOptionItem.price,
          modificationGroupId: modificationGroupItem.id,
        })),
        skipDuplicates: true,
      });
    }
    return await this.prisma.modificationGroup.findMany();
  }
}
