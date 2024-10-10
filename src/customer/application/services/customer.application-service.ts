import { Inject, Injectable } from '@nestjs/common';
import { CustomerRepositoryPort } from 'src/customer/domain/customer-repository.port';
import { CustomerEntity } from 'src/customer/domain/customer.entity';
import { CustomerExistsError } from 'src/customer/errors/customer-exists.error';

type CreateCustomerParams = {
  name: string;
  address: string;
  countryCode: string;
  phoneNumber: string;
};

@Injectable()
export class CustomerApplicationService {
  constructor(
    @Inject(CustomerRepositoryPort)
    private readonly customerRepository: CustomerRepositoryPort,
  ) {}

  async create(params: CreateCustomerParams) {
    let customer = await this.customerRepository.findByPhoneNumber(
      params.phoneNumber,
      params.countryCode,
    );

    if (customer) {
      throw new CustomerExistsError();
    }

    customer = CustomerEntity.create(params);

    await this.customerRepository.create(customer);

    return customer;
  }
}
