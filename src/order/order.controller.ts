import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/common/guards/jwt-guard';
import { OrderService } from './order.service';
import { AuthUser, GetCurrentUser } from 'src/common/decorators';
import { InitiateOrderDto } from './dto/create-order.dto';

@UseGuards(JwtGuard)
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('create')
  createOrder(@GetCurrentUser() user: AuthUser, @Body() dto: InitiateOrderDto) {
    return this.orderService.initiateOrder(user, dto);
  }
}
