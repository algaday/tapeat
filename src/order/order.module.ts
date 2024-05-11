import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { DeliveryModule } from 'src/delivery/delivery.module';

@Module({
  imports: [DeliveryModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
