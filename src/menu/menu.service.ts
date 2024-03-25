import { Injectable } from '@nestjs/common';

import { RestaurantService } from 'src/restaurant/restaurant.service';
import { AuthUser } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuItemDto } from './dto';
import { CreateModificationDto } from './dto/create-modification.dto';

@Injectable()
export class MenuService {
  constructor(
    private restaurantService: RestaurantService,
    private prisma: PrismaService,
  ) {}

  async createMenuItem(dto: CreateMenuItemDto, userInfo: AuthUser) {
    const { name, category, description, price, imageId, modifications } = dto;
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

    if (!modifications || modifications?.length === 0) {
      return menuItem;
    }

    const modificationWithMenu =
      await this.prisma.menuItemModification.createMany({
        data: modifications.map((modification) => ({
          menuItemId: menuItem.id,
          modificationId: modification.modificationId,
          price: modification.price,
        })),
      });

    return modificationWithMenu;
  }

  async createModification(dto: CreateModificationDto) {
    const { modificationGroups } = dto;

    for (const modificationGroup of modificationGroups) {
      const modification = await this.prisma.modificationGroup.create({
        data: {
          name: modificationGroup.name,
        },
      });

      await this.prisma.modification.createMany({
        data: modificationGroup.options.map((modificationOptionItem) => ({
          name: modificationOptionItem.name,
          price: modificationOptionItem.price,
          groupId: modification.id,
        })),
        skipDuplicates: true,
      });
    }

    return 'Modification Group Created';
  }

  async getModifications() {
    return await this.prisma.modificationGroup.findMany();
  }
}
