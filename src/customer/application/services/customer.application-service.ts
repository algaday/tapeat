import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../../presentation/dto/create-customer.dto';
import { CustomerRepository } from '../../repository/customer.respository';

@Injectable()
export class CustomerApplicationService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(dto: CreateCustomerDto) {
    this.customerRepository.create(dto);
  }
}
