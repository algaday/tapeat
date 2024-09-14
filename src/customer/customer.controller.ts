import { Body, Controller, Post, Res } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Response } from 'express';
import { CustomerMapper } from './customer.mapper';
import { AuthDto } from 'src/auth/dto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post('create')
  async createCustomer(
    @Body() dto: CreateCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user } =
      await this.customerService.createCustomer(dto);

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);

    res.cookie('token', accessToken, {
      httpOnly: true,
      expires: expirationDate,
    });

    return CustomerMapper.toDto(user);
  }

  @Post('login')
  async loginCustomer(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user } = await this.customerService.loginCustomer(dto);

    const expirationDate = new Date();

    expirationDate.setDate(expirationDate.getDate() + 1);

    res.cookie('token', accessToken, {
      httpOnly: true,
      expires: expirationDate,
    });

    return CustomerMapper.toDto(user);
  }
}
