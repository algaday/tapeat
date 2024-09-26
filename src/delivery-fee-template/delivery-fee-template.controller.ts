import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DeliveryTemplateFeeService } from './delivery-fee-template.service';
import { JwtGuard } from 'src/common/guards/jwt-guard';
import { AuthUser, GetCurrentUser } from 'src/common/decorators';
import { CreateDeliveryFeeTemplatesDto } from './dto';

@Controller('delivery-fee-templates')
@UseGuards(JwtGuard)
export class DeliveryFeeTemplateController {
  constructor(private deliveryFeeTemplateService: DeliveryTemplateFeeService) {}

  @Post()
  create(
    @GetCurrentUser() user: AuthUser,
    @Body() dto: CreateDeliveryFeeTemplatesDto,
  ) {
    return this.deliveryFeeTemplateService.create(user, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.deliveryFeeTemplateService.delete(id);
  }

  @Get(':restaurantId')
  get(@Param('restaurantId') restaurantId: string) {
    return this.deliveryFeeTemplateService.get(restaurantId);
  }
}
