import { Injectable } from '@nestjs/common';

import { AuthUser } from 'src/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuItemDto } from './dto';
import { MenuItemMapper } from './menu-item.mapper';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuItemDoesNotExist as MenuItemNotFound } from './errors/menu-item-not-found.error';
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
        modificationGroups: {
          include: {
            modificationGroup: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!menuItem) {
      throw new MenuItemNotFound();
    }

    return MenuItemMapper.toDto(menuItem);
  }

  async findMenuItems(user: AuthUser) {
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
      await this.mediaService.markImageAssigned(imageId);

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
        await this.createManyMenuItemModifications(
          menuItem.id,
          modificationGroupIds,
        );
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
      modificationGroupIds,
    } = dto;

    const menuItem = await this.prisma.menuItem.findUnique({
      where: {
        id: menuItemId,
      },
    });

    if (!menuItem) {
      throw new MenuItemNotFound();
    }

    const updateData = {
      nameOfDish: name,
      category,
      description,
      price,
    };

    if (newImageId === menuItem.imageId) {
      return this.prisma.$transaction(async () => {
        const updatedMenuItem = await this.updateMenuItemData(
          menuItemId,
          updateData,
        );

        await this.updateMenuItemModificationGroup(
          updatedMenuItem.id,
          modificationGroupIds,
        );

        return updatedMenuItem;
      });
    }

    return await this.prisma.$transaction(async () => {
      const updatedMenuItem = await this.updateMenuItemData(menuItemId, {
        ...updateData,
        imageId: newImageId,
      });

      await this.mediaService.markImageAssigned(newImageId);

      await this.mediaService.markImageUnassigned(menuItem.imageId);

      await this.updateMenuItemModificationGroup(
        updatedMenuItem.id,
        modificationGroupIds,
      );

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
      throw new MenuItemNotFound();
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

  updateMenuItemData(id: string, data: Prisma.MenuItemUncheckedUpdateInput) {
    return this.prisma.menuItem.update({
      where: {
        id,
      },
      data,
    });
  }

  updateMenuItemModificationGroup(id: string, modificationGroupIds: string[]) {
    const menuItemModificationGroups = this.prisma.$transaction(async () => {
      await this.deleteManyMenuItemModifications(id);

      return this.createManyMenuItemModifications(id, modificationGroupIds);
    });

    return menuItemModificationGroups;
  }

  deleteManyMenuItemModifications(id: string) {
    return this.prisma.menuItemModificationGroup.deleteMany({
      where: {
        menuItemId: id,
      },
    });
  }

  createManyMenuItemModifications(id: string, modificationGroupIds: string[]) {
    return this.prisma.menuItemModificationGroup.createMany({
      data: modificationGroupIds.map((modification) => ({
        menuItemId: id,
        modificationId: modification,
      })),
    });
  }
}
