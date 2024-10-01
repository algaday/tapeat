import { Inject, Injectable } from '@nestjs/common';

import { CustomerMapper } from '../../mappers/customer.mapper';
import { CustomerDto as CustomerUi } from 'src/customer/presentation/dto/customer.dto';
import { CustomerEntity } from 'src/customer/domain/customer.entity';
import { UseCase } from 'src/core/domain/use-case.interface';
import { CustomerRepositoryPort } from 'src/customer/domain/customer-repository.port';

interface Props {
  name: string;
  countryCode: string | null;
  address: string | null;
  phoneNumber: string | null;
}

@Injectable()
export class CreateCustomerUseCase implements UseCase<Props, CustomerUi> {
  constructor(
    @Inject(CustomerRepositoryPort)
    private readonly customerRepository: CustomerRepositoryPort,
    private readonly mapper: CustomerMapper,
  ) {}

  async execute(props: Props): Promise<CustomerUi> {
    const customer = CustomerEntity.create({
      address: props.address,
      countryCode: props.countryCode,
      name: props.name,
      phoneNumber: props.phoneNumber,
    });

    await this.customerRepository.create(customer);

    return this.mapper.toUi(customer);
  }
}
