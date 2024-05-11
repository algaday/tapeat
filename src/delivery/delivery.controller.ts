import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { JwtGuard } from 'src/common/guards/jwt-guard';
import { AuthUser, GetCurrentUser } from 'src/common/decorators';
import { CreateDeliveryFeeTemplateDto, DeleteDeliveryFeeDto } from './dto';

@Controller('delivery')
@UseGuards(JwtGuard)
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}

  @Post('create-template')
  createDeliveryFeeTemplate(
    @GetCurrentUser() user: AuthUser,
    @Body() dto: CreateDeliveryFeeTemplateDto,
  ) {
    return this.deliveryService.createDeliveryFeeTemplate(user, dto);
  }

  @Delete('delete-template')
  deleteDeliveryFeeTemplate(@GetCurrentUser() user: AuthUser) {
    return this.deliveryService.deleteDeliveryFeeTemplate(user);
  }

  @Delete('delete-fee')
  deleteDeliveryFee(@Body() dto: DeleteDeliveryFeeDto) {
    return this.deliveryService.deleteDeliveryFee(dto);
  }

  @Get('delivery-template')
  getDeliveryTemplate(@GetCurrentUser() user: AuthUser) {
    return this.deliveryService.getDeliveryTemplate(user);
  }
}
