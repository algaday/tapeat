import { Injectable } from '@nestjs/common';
import { AuthUser } from 'src/common/decorators';
import { CreateDeliveryFeeTemplateDto, DeleteDeliveryFeeDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeliveryService {
  constructor(private prisma: PrismaService) {}

  async createDeliveryFeeTemplate(
    user: AuthUser,
    dto: CreateDeliveryFeeTemplateDto,
  ) {
    const { minTotalPrice, maxTotalPrice, fee } = dto;

    const deliveryTemplate = await this.prisma.deliveryFee.create({
      data: {
        restaurantId: user.restaurantId,
        minTotalPrice,
        maxTotalPrice,
        fee,
      },
    });

    return deliveryTemplate;
  }

  async deleteDeliveryFeeTemplate(user: AuthUser) {
    return this.prisma.deliveryFee.deleteMany({
      where: { restaurantId: user.restaurantId },
    });
  }

  async deleteDeliveryFee(dto: DeleteDeliveryFeeDto) {
    const fee = await this.prisma.deliveryFee.delete({ where: { id: dto.id } });
    return fee;
  }

  async getDeliveryTemplate(user: AuthUser) {
    return this.prisma.deliveryFee.findMany({
      where: { restaurantId: user.restaurantId },
    });
  }

  async calculateDeliveryPrice(orderTotal: number) {
    const fee = await this.prisma.deliveryFee.findFirst({
      where: {
        AND: [
          { minTotalPrice: { lte: orderTotal } },
          { maxTotalPrice: { gt: orderTotal } },
        ],
      },
    });

    if (!fee) {
      console.log('Calculate by Delivery Partner and return it');
      return 3500;
    }

    return fee.fee;
  }
}
