import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';

@Module({
  exports: [DeliveryService],
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
