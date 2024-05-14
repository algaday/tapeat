import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators';
import {
  CreateOrderDto,
  MenuItemDto,
  ModificationDto,
} from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Modification, Prisma } from '@prisma/client';
import { MenuItemWithModificationGroups, ModifiedMenuItem } from './types';
import { DeliveryTemplateFeeService } from 'src/delivery-fee-template/delivery-fee-template.service';
import * as _ from 'lodash';
import {
  DeliveryFeeMismatchError,
  MenuItemMissingError,
  MenuItemPriceMismatchError,
  MenuItemsMissingError,
  ModificationMissingError,
  ModificationPriceMismatchError,
  TotalAmountMismatch,
} from './errors';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private deliveryTemplateFeeService: DeliveryTemplateFeeService,
  ) {}

  async create(user: AuthUser, dto: CreateOrderDto) {
    const orderMenuItemIds = dto.menuItems.map((menuItem) => menuItem.id);

    const menuItems = await this.findMenuItemByIds(orderMenuItemIds);

    this.validateMenuItems(dto, menuItems);

    const calculatedOrderFee =
      await this.deliveryTemplateFeeService.calculateDeliveryFee(
        dto.subtotal,
        user,
      );

    if (dto.orderFee !== calculatedOrderFee) {
      throw new DeliveryFeeMismatchError();
    }

    const calculatedTotalAmount = this.calculateTotalAmount(dto);

    if (dto.totalAmount !== calculatedTotalAmount)
      throw new TotalAmountMismatch();

    return this.prisma.$transaction(async () => this.persistOrder(dto, user));
  }

  async persistOrder(dto: CreateOrderDto, user: AuthUser) {
    const {
      restaurantId,
      totalAmount,
      address,
      phoneNumber,
      comments,
      orderFee,
      subtotal,
    } = dto;

    const order = await this.prisma.order.create({
      data: {
        restaurantId,
        customerId: user.id,
        totalAmount,
        address,
        phoneNumber,
        comments,
        orderFee,
        subtotal,
      },
    });

    const orderMenuItems = dto.menuItems.map(async (menuItem) => {
      const { id, quantity, price, modifications } = menuItem;

      const orderItem = await this.createOrderItem({
        menuItemId: id,
        orderId: order.id,
        quantity,
        price,
      });

      const createOrderItemModification = this.createOrderItemModification(
        orderItem.id,
        modifications,
      );

      await Promise.all(createOrderItemModification);

      return orderItem;
    });

    await Promise.all(orderMenuItems);

    return order;
  }

  createOrderItem(data: Prisma.OrderItemUncheckedCreateInput) {
    return this.prisma.orderItem.create({ data });
  }

  createOrderItemModification(
    orderItemId: string,
    modifications: ModificationDto[],
  ) {
    const createOrderItemModification = modifications.map((modification) => {
      return this.prisma.orderItemModification.create({
        data: {
          orderItemId,
          modificationId: modification.id,
          quantity: modification.quantity,
          price: modification.price,
        },
      });
    });

    return createOrderItemModification;
  }

  calculateTotalAmount(dto: CreateOrderDto) {
    return this.calculateMenuItemsTotal(dto.menuItems) + dto.orderFee;
  }

  calculateMenuItemsTotal(menuItems: MenuItemDto[]) {
    return _.sumBy(menuItems, (menuItem) => {
      const modificationsTotal = this.calculateModificationsTotal(
        menuItem.modifications,
      );
      return menuItem.price * menuItem.quantity + modificationsTotal;
    });
  }

  calculateModificationsTotal(modifications: ModificationDto[]) {
    return _.sumBy(
      modifications,
      (modification) => modification.price * modification.quantity,
    );
  }

  validateMenuItems(dto: CreateOrderDto, menuItems: ModifiedMenuItem[]) {
    dto.menuItems.map((menuItemDto) => {
      const menuItem = this.getMenuItem(menuItemDto.id, menuItems);

      if (!menuItem.price.equals(menuItemDto.price)) {
        throw new MenuItemPriceMismatchError();
      }

      this.validateModifications(
        menuItemDto.modifications,
        menuItem.modifications,
      );
    });
  }

  validateModifications(
    modificationDtos: ModificationDto[],
    modifications: Modification[],
  ) {
    modificationDtos.map((modificationDto) => {
      const modification = this.getModification(
        modificationDto.id,
        modifications,
      );

      if (!modification.price.equals(modificationDto.price)) {
        throw new ModificationPriceMismatchError();
      }
    });
  }

  getMenuItem(menuItemId: string, menuItems: ModifiedMenuItem[]) {
    const menuItem = menuItems.find((menuItem) => menuItem.id === menuItemId);

    if (!menuItem) {
      throw new MenuItemMissingError();
    }

    return menuItem;
  }

  getModification(modificationId: string, modifications: Modification[]) {
    const modification = modifications.find(
      (modification) => modification.id === modificationId,
    );

    if (!modification) {
      throw new ModificationMissingError();
    }

    return modification;
  }

  async findMenuItemByIds(menuItemIds: string[]) {
    const menuItemsWithModificationGroups = await this.prisma.menuItem.findMany(
      {
        where: {
          id: {
            in: menuItemIds,
          },
        },
        include: {
          modificationGroups: {
            include: {
              modificationGroup: {
                include: {
                  modifications: true,
                },
              },
            },
          },
        },
      },
    );

    if (!menuItemsWithModificationGroups.length) {
      throw new MenuItemsMissingError();
    }
    const menuItemsWithModifications = menuItemsWithModificationGroups.map(
      (menuItemWithModificationGroup) =>
        this.mapToMenuItemWithModification(menuItemWithModificationGroup),
    );

    return menuItemsWithModifications;
  }

  mapToMenuItemWithModification(menuItem: MenuItemWithModificationGroups) {
    const modifications = _.flatten(
      menuItem.modificationGroups.map((modificationGroups) => {
        return modificationGroups.modificationGroup.modifications;
      }),
    );

    const menuItemWithoutModificationGroups = _.omit(menuItem, [
      'modificationGroups',
    ]);

    return {
      ...menuItemWithoutModificationGroups,
      modifications,
    };
  }
}
