import { Injectable } from '@nestjs/common';

import { AuthUser } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuItemDto, ModificationGroupDto } from './dto';
import { MenuItemMapper } from './menu-item.mapper';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuItemDoesNotExist } from './errors/menu-item-does-not-exist.error';
import { MediaService } from 'src/media/media.service';
import { Prisma } from '@prisma/client';
import { DeleteMenuItemDto } from './dto/delete-menu-item.dto';

@Injectable()
export class MenuService {
  constructor(
    private mediaService: MediaService,
    private prisma: PrismaService,
  ) {}

  async getMenuItem(params: { id: string }) {
    const menuItem = await this.prisma.menuItem.findUnique({
      where: {
        id: params.id,
      },
      include: {
        image: true,
      },
    });

    return MenuItemMapper.toDto(menuItem);
  }

  async getAllMenuItems(user: AuthUser) {
    const menuItems = await this.prisma.menuItem.findMany({
      where: {
        restaurantId: user.restaurantId,
      },
      include: {
        image: true,
      },
    });

    return menuItems.map((menuItem) => MenuItemMapper.toDto(menuItem));
  }

  async createMenuItem(dto: CreateMenuItemDto, user: AuthUser) {
    const {
      name,
      category,
      description,
      price,
      imageId,
      modificationGroupIds,
    } = dto;

    const menuItem = await this.prisma.$transaction(async () => {
      await this.prisma.image.update({
        where: {
          id: imageId,
        },
        data: {
          isAssigned: true,
        },
      }); //todo: use mediaservice

      const menuItem = await this.prisma.menuItem.create({
        data: {
          nameOfDish: name,
          category,
          description,
          price,
          imageId,
          restaurantId: user.restaurantId,
        },
      });

      if (modificationGroupIds.length) {
        await this.prisma.menuItemModificationGroup.createMany({
          data: modificationGroupIds.map((modification) => ({
            menuItemId: menuItem.id,
            modificationId: modification,
          })),
        });
      }
    });

    if (modificationGroupIds?.length === 0) {
      return menuItem;
    }
    // todo: use transaction

    return menuItem;
  }

  async updateMenuItem(dto: UpdateMenuItemDto) {
    const {
      name,
      menuItemId,
      imageId: newImageId,
      category,
      description,
      price,
    } = dto;

    const menuItem = await this.prisma.menuItem.findUnique({
      where: {
        id: menuItemId,
      },
    });

    if (!menuItem) {
      throw new MenuItemDoesNotExist();
    }

    const updateData = {
      nameOfDish: name,
      category,
      description,
      price,
    };

    if (newImageId === menuItem.imageId) {
      return this.updateMenuItemData(menuItemId, updateData);
    }

    return await this.prisma.$transaction(async () => {
      const updatedMenuItem = await this.updateMenuItemData(menuItemId, {
        ...updateData,
        imageId: newImageId,
      });

      await this.mediaService.markImageAssigned(newImageId);

      await this.mediaService.markImageUnassigned(menuItem.imageId);

      return updatedMenuItem;
    });
  }

  async deleteMenuItem({ menuItemId }: DeleteMenuItemDto) {
    const menuItem = await this.prisma.menuItem.findUnique({
      where: {
        id: menuItemId,
      },
    });

    if (!menuItem) {
      throw new MenuItemDoesNotExist();
    }

    const deletedMenuItem = this.prisma.$transaction(async () => {
      this.mediaService.markImageUnassigned(menuItem.imageId);

      return this.prisma.menuItem.delete({
        where: {
          id: menuItemId,
        },
      });
    });

    return deletedMenuItem;
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

  updateMenuItemData(id: string, data: Prisma.MenuItemUncheckedUpdateInput) {
    return this.prisma.menuItem.update({
      where: {
        id,
      },
      data,
    });
  }
}
