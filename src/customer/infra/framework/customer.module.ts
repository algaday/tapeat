import { Module } from '@nestjs/common';
import { CustomerRepositoryPort } from 'src/customer/domain/customer-repository.port';
import { PrismaCustomerRepositoryAdapter } from '../repositories/prisma-customer-repository.adapter';
import { CustomerMapper } from 'src/customer/application/mappers/customer.mapper';
import {
  CUSTOMER_APPLICATION_SERVICES,
  CUSTOMER_USE_CASES,
} from 'src/customer/application/use-cases';
import { CustomerController } from 'src/customer/presentation/customer.controller';

const REPOSITORIES = [
  {
    provide: CustomerRepositoryPort,
    useClass: PrismaCustomerRepositoryAdapter,
  },
];

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [
    CustomerMapper,
    ...CUSTOMER_USE_CASES,
    ...REPOSITORIES,
    ...CUSTOMER_APPLICATION_SERVICES,
  ],
})
export class CustomerModule {}
