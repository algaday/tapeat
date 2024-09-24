import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators';
import { CreateDeliveryFeeTemplatesDto, DeliveryFeeTemplate } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmptyDeliveryFeeTemplateError } from './errors/empty-delivery-fee-template.error';
import { DeliveryFeeTemplateInitialValueError } from './errors/delivery-fee-template-initial.error';

@Injectable()
export class DeliveryTemplateFeeService {
  constructor(private prisma: PrismaService) {}

  async create(user: AuthUser, dto: CreateDeliveryFeeTemplatesDto) {
    const { deliveryFeeTemplates } = dto;

    if (!deliveryFeeTemplates.length) {
      throw new EmptyDeliveryFeeTemplateError();
    }

    if (!this.minOrderAmountStartsWithZero(dto)) {
      throw new DeliveryFeeTemplateInitialValueError();
    }

    return this.persistDeliveryFeeTemplates(deliveryFeeTemplates, user);
  }

  async persistDeliveryFeeTemplates(
    deliveryFeeTemplates: DeliveryFeeTemplate[],
    user: AuthUser,
  ) {
    return this.prisma.deliveryTemplateFee.createMany({
      data: deliveryFeeTemplates.map((deliveryFeeTemplate) => ({
        restaurantId: user.restaurantId,
        minOrderAmount: deliveryFeeTemplate.minOrderAmount,
        deliveryFee: deliveryFeeTemplate.deliveryFee,
      })),
    });
  }

  minOrderAmountStartsWithZero(dto: CreateDeliveryFeeTemplatesDto) {
    const deliveryAmount = dto.deliveryFeeTemplates.filter(
      (deliveryFee) => deliveryFee.minOrderAmount === 0,
    );

    return deliveryAmount.length ? true : false;
  }

  async delete(id: string) {
    const deliveryFee = await this.prisma.deliveryTemplateFee.delete({
      where: { id },
    });
    return deliveryFee;
  }

  async get(user: AuthUser) {
    return this.prisma.deliveryTemplateFee.findMany({
      where: { restaurantId: user.restaurantId },
      orderBy: {
        minOrderAmount: 'asc',
      },
    });
  }

  async calculateDeliveryFee(orderTotal: number, user: AuthUser) {
    let fee = 0;

    const deliveryFeeTemplate = await this.prisma.deliveryTemplateFee.findMany({
      where: {
        restaurantId: user.restaurantId,
      },
      orderBy: { minOrderAmount: 'desc' },
    });

    if (!deliveryFeeTemplate) {
      console.log('Calculate by Delivery Partner and return it');
      return 3500;
    }

    for (const deliveryFee of deliveryFeeTemplate) {
      if (deliveryFee.minOrderAmount.lessThanOrEqualTo(orderTotal)) {
        fee = deliveryFee.deliveryFee.toNumber();
        break;
      }
    }

    return fee;
  }
}
