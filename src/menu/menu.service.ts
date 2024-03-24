import { Injectable } from '@nestjs/common';

import { RestaurantService } from 'src/restaurant/restaurant.service';
import { AuthUser } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuItemDto, ModificationDto } from './dto';

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
      await this.prisma.menuItemWithModification.createMany({
        data: modifications.map((modification) => ({
          menuItemId: menuItem.id,
          modificationId: modification.modificationId,
          price: modification.price,
        })),
      });

    return modificationWithMenu;
  }

  async createModification(dto: ModificationDto) {
    const modification = await this.prisma.modification.create({
      data: {
        name: dto.name,
        price: dto.price,
        groupName: dto.group,
      },
    });
    return modification;
  }

  async getModifications() {
    return await this.prisma.modification.findMany();
  }
}
