import { Body, Controller, Post } from '@nestjs/common';
import { CustomerService } from '../application/services/customer.application-service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  async create(@Body() dto: CreateCustomerDto) {
    return await this.customerService.create(dto);
  }
}
