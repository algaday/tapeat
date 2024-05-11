import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators';
import { InitiateOrderDto, ModificationGroups } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MenuModificationNotFound } from './errors/menu-not-found.error';
import { PriceNotMatchError } from './errors/price-not-match.error';
import { Modification, Prisma } from '@prisma/client';
import { TotalAmountMismatch } from './errors/total-amount-mismatch.error';
import { ModificationGroupNotFoundError } from './errors/modification-group-not-found.error';
import {
  MenuItemModificationGroupWithPayload,
  MenuItemWithPayload,
} from './types';
import { DeliveryService } from 'src/delivery/delivery.service';
import { DeliveryFeeMismatchError } from './errors/delivery-fee-mismatch.error';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private deliveryService: DeliveryService,
  ) {}

  async initiateOrder(user: AuthUser, dto: InitiateOrderDto) {
    const orderMenuItemIds = dto.menuItems.map((menuItem) => menuItem.id);

    const menuItems = await this.findMenuItemByIds(orderMenuItemIds);

    this.validateMenuItems(dto, menuItems);

    const calculatedTotalAmount = this.calculateTotalAmount(dto);

    if (dto.totalAmount !== calculatedTotalAmount)
      throw new TotalAmountMismatch();

    const calculatedOrderFee =
      await this.deliveryService.calculateDeliveryPrice(dto.totalAmount);

    if (dto.orderFee !== Number(calculatedOrderFee)) {
      throw new DeliveryFeeMismatchError();
    }

    const order = await this.prisma.$transaction(async () =>
      this.createOrder(dto, user),
    );

    return order;
  }

  async createOrder(dto: InitiateOrderDto, user: AuthUser) {
    const {
      restaurantId,
      totalAmount,
      address,
      phoneNumber,
      comments,
      orderFee,
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
      },
    });

    const orderMenuItems = dto.menuItems.map(async (menuItem) => {
      const { id, quantity, price, modificationGroups } = menuItem;

      const orderItem = await this.createOrderItem({
        menuItemId: id,
        orderId: order.id,
        quantity,
        price,
      });

      const createOrderItemModification = this.createOrderItemModification(
        orderItem.id,
        modificationGroups,
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
    modificationGroups: ModificationGroups[],
  ) {
    const createOrderItemModification = modificationGroups.map(
      async ({ modifications }) => {
        const orderItemModifications = modifications.map(
          async (modification) => {
            return this.prisma.orderItemModification.create({
              data: {
                orderItemId,
                modificationId: modification.id,
                quantity: modification.quantity,
                price: modification.price,
              },
            });
          },
        );

        await Promise.all(orderItemModifications);

        return orderItemModifications;
      },
    );
    return createOrderItemModification;
  }

  calculateTotalAmount(dto: InitiateOrderDto) {
    const menuItemTotalPrice = dto.menuItems.reduce((acc, current) => {
      acc += current.price * current.quantity;

      current.modificationGroups.forEach((modificationGroup) => {
        const modificationsTotalPrice = modificationGroup.modifications.reduce(
          (acc, curr) => (acc += curr.price * curr.quantity),
          0,
        );
        acc += modificationsTotalPrice;
      });

      return acc;
    }, 0);

    return menuItemTotalPrice;
  }

  validateMenuItems(dto: InitiateOrderDto, menuItems: MenuItemWithPayload[]) {
    dto.menuItems.map((menuItemDto) => {
      const menuItem = this.getMenuItem(menuItemDto.id, menuItems);

      if (!menuItem.price.equals(menuItemDto.price)) {
        throw new PriceNotMatchError();
      }

      this.validateModificationGroups(menuItemDto.modificationGroups, menuItem);
    });
  }

  getMenuItem(menuItemId: string, menuItems: MenuItemWithPayload[]) {
    const menuItem = menuItems.filter(
      (menuItem) => menuItem.id === menuItemId,
    )[0];

    if (!menuItem) throw new MenuModificationNotFound();

    return menuItem;
  }

  getModificationGroup(
    id: string,
    menuItemModificationGroups: MenuItemModificationGroupWithPayload[],
  ) {
    const modificationGroup = menuItemModificationGroups.filter(
      (modificationGroup) => modificationGroup.modificationId === id,
    )[0];

    if (!modificationGroup) throw new ModificationGroupNotFoundError();

    return modificationGroup;
  }

  getModification(modificationId: string, modifications: Modification[]) {
    const modification = modifications.filter(
      (modification) => modification.id === modificationId,
    )[0];

    if (!modification) throw new MenuModificationNotFound();

    return modification;
  }

  validateModificationGroups(
    modificationGroupsDto: ModificationGroups[],
    menuItem: MenuItemWithPayload,
  ) {
    modificationGroupsDto.map((modificationGroupDto) => {
      const { modificationGroup } = this.getModificationGroup(
        modificationGroupDto.id,
        menuItem.modificationGroups,
      );

      modificationGroup.modifications.map((modificationDto) => {
        const modifications = modificationGroup.modifications;

        const modification = this.getModification(
          modificationDto.id,
          modifications,
        );

        if (!modification.price.equals(modification.price))
          throw new PriceNotMatchError();
      });
    });
  }

  async findMenuItemByIds(menuItemIds: string[]) {
    const menuItemsWithModifications = await this.prisma.menuItem.findMany({
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
    });

    return menuItemsWithModifications;
  }
}
