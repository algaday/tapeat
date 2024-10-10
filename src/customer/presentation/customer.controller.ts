import { Body, Controller, Post } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CreateCustomerUseCase } from '../application/use-cases/create-customer/create-customer.use-case';

@Controller('customers')
export class CustomerController {
  constructor(private readonly createCustomer: CreateCustomerUseCase) {}

  @Post()
  async create(@Body() dto: CreateCustomerDto) {
    return await this.createCustomer.execute(dto);
  }
}
