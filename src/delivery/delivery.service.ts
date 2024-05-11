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
}
