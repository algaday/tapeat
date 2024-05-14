import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { DeliveryFeeTemplateModule } from 'src/delivery-fee-template/delivery-fee-template.module';

@Module({
  imports: [DeliveryFeeTemplateModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
