import { Injectable } from '@nestjs/common';
import { RepositoryBase } from 'src/core/domain/repository.base';
import {
  PaginatedQueryParams,
  Paginated,
} from 'src/core/domain/repository.interface';
import { CustomerMapper } from 'src/customer/application/mappers/customer.mapper';
import { CustomerRepositoryPort } from 'src/customer/domain/customer-repository.port';
import { CustomerEntity } from 'src/customer/domain/customer.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismaCustomerRepositoryAdapter
  extends RepositoryBase<CustomerEntity>
  implements CustomerRepositoryPort
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: CustomerMapper,
  ) {
    super(prisma);
  }
  async findByPhoneNumber(
    phoneNumber: string,
    countryCode: string,
  ): Promise<CustomerEntity | null> {
    const customer = await this.prisma.customer.findFirst({
      where: {
        countryCode,
        phoneNumber,
      },
    });

    return customer && this.mapper.toDomain(customer);
  }
  async create(customer: CustomerEntity): Promise<void> {
    await this.prisma.customer.create({
      data: this.mapper.toPersistence(customer),
    });
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
