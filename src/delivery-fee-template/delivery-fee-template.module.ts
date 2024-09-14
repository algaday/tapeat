import { Module } from '@nestjs/common';
import { DeliveryTemplateFeeService } from './delivery-fee-template.service';
import { DeliveryFeeTemplateController } from './delivery-fee-template.controller';

@Module({
  exports: [DeliveryTemplateFeeService],
  controllers: [DeliveryFeeTemplateController],
  providers: [DeliveryTemplateFeeService],
})
export class DeliveryFeeTemplateModule {}
