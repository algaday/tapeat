import { Injectable } from '@nestjs/common';
import { RepositoryBase } from 'src/core/domain/repository.base';
import {
  PaginatedQueryParams,
  Paginated,
} from 'src/core/domain/repository.interface';
import { CustomerRepositoryPort } from 'src/customer/domain/customer-repository.port';
import { CustomerEntity } from 'src/customer/domain/customer.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismaCustomerRepositoryAdapter
  extends RepositoryBase<CustomerEntity>
  implements CustomerRepositoryPort
{
  constructor(private readonly prisma: PrismaService) {
    super(prisma);
  }
  findByPhoneNumber(phoneNumber: number): Promise<CustomerEntity | null> {
    throw new Error('Method not implemented.');
  }
  create(entity: CustomerEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(entity: CustomerEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(entity: CustomerEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<CustomerEntity> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<CustomerEntity[]> {
    throw new Error('Method not implemented.');
  }
  findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<CustomerEntity>> {
    throw new Error('Method not implemented.');
  }
}
