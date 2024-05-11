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
    const {
      name,
      category,
      description,
      price,
      imageId,
      modificationGroupIds,
    } = dto;
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

    if (modificationGroupIds?.length === 0) {
      return menuItem;
    }

    await this.prisma.menuItemModificationGroup.createMany({
      data: modificationGroupIds.map((modification) => ({
        menuItemId: menuItem.id,
        modificationId: modification,
      })),
    });

    return menuItem;
  }

  async createModificationGroup(modificationGroupDto: ModificationGroupDto) {
    const modificationGroup = await this.prisma.modificationGroup.create({
      data: {
        name: modificationGroupDto.name,
      },
    });

    await this.prisma.modification.createMany({
      data: modificationGroupDto.options.map((modification) => ({
        name: modification.name,
        price: modification.price,
        modificationGroupId: modificationGroup.id,
      })),
      skipDuplicates: true,
    });

    return modificationGroup;
  }
}
