import { IRepository } from 'src/core/domain/repository.interface';
import { CustomerEntity } from './customer.entity';

export interface CustomerRepositoryPort extends IRepository<CustomerEntity> {
  findByPhoneNumber(phoneNumber: number): Promise<CustomerEntity | null>;
}

export const CustomerRepositoryPort: unique symbol = Symbol(
  'CUSTOMER_REPOSITORY',
);
