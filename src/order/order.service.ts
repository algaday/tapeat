import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MenuModificationNotFound } from './errors/menu-not-found.error';
import { PriceNotMatchError } from './errors/price-not-match.error';
import { MenuItem, Modification, Prisma } from '@prisma/client';
import { MenuItemsListError } from './errors/menu-items-list.error';
import { ModificationsListNotFoundError } from './errors/modifications-list-not-found.error';
import { TotalAmountNotMatch } from './errors/total-amount-not-match.error';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(user: AuthUser, dto: CreateOrderDto) {
    const { restaurantId, totalAmount, address, phoneNumber, comments } = dto;

    const menuItemsList = await this.prisma.menuItem.findMany();

    const modificationsList = await this.prisma.modification.findMany();

    if (!menuItemsList) throw new MenuItemsListError();

    if (!modificationsList) throw new ModificationsListNotFoundError();

    const calculatedTotalAmount = this.checkPriceAndTotalAmount(
      dto,
      menuItemsList,
      modificationsList,
    );

    if (totalAmount !== calculatedTotalAmount) throw new TotalAmountNotMatch();

    const order = await this.prisma.$transaction(async () => {
      const order = await this.createSingleOrder({
        restaurantId,
        customerId: user.id,
        totalAmount,
        address,
        phoneNumber,
        comments,
      });

      const orderMenuItems = dto.order.map(async (menuItem) => {
        const { id, quantity, price } = menuItem;

        const orderItem = await this.createOrderItem({
          menuItemId: id,
          orderId: order.id,
          quantity,
          price,
        });

        const createOrderItemModification = menuItem.modifications.map(
          async (modification) => {
            const { id, price, quantity } = modification;

            return this.createOrderItemModification({
              orderItemId: orderItem.id,
              modificationId: id,
              quantity,
              price,
            });
          },
        );

        await Promise.all(createOrderItemModification);

        return orderItem;
      });

      await Promise.all(orderMenuItems);

      return order;
    });

    return order;
  }

  createSingleOrder(data: Prisma.OrderUncheckedCreateInput) {
    return this.prisma.order.create({ data });
  }

  createOrderItem(data: Prisma.OrderItemUncheckedCreateInput) {
    return this.prisma.orderItem.create({ data });
  }

  createOrderItemModification(
    data: Prisma.OrderItemModificationUncheckedCreateInput,
  ) {
    return this.prisma.orderItemModification.create({ data });
  }

  getItemFromList<T extends { id: string }>(itemId: string, list: T[]): T {
    const item = list.filter((menuItem) => menuItem.id === itemId);

    if (!item.length) throw new MenuModificationNotFound();

    return item[0];
  }

  checkPriceAndTotalAmount(
    { order }: CreateOrderDto,
    menuItemsList: MenuItem[],
    modificationsList: Modification[],
  ) {
    order.forEach((menuItem) => {
      const menuItemFromDb = this.getItemFromList<MenuItem>(
        menuItem.id,
        menuItemsList,
      );

      if (Number(menuItemFromDb.price) !== menuItem.price)
        throw new PriceNotMatchError();

      menuItem.modifications.forEach((modification) => {
        const { id, price } = modification;

        const modificationFromDb = this.getItemFromList<Modification>(
          id,
          modificationsList,
        );

        if (price !== Number(modificationFromDb.price))
          throw new PriceNotMatchError();
      });
    });

    const totalMenuItemsPrice = order.reduce((prev, next) => {
      const totalModificationsPrice = next.modifications.reduce(
        (prev, next) => prev + next.price * next.quantity,
        0,
      );

      return prev + (next.price * next.quantity + totalModificationsPrice);
    }, 0);

    return totalMenuItemsPrice;
  }
}
