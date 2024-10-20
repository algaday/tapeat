/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RepositoryBase } from 'src/core/domain/repository.base';
import {
  PaginatedQueryParams,
  Paginated,
} from 'src/core/domain/repository.interface';
import { InventoryCountMapper } from 'src/inventory-count/application/mappers/inventory-count.mapper';
import { InventoryCountRepositoryPort } from 'src/inventory-count/domain/inventory-count-repository.port';
import { InventoryCountEntity } from 'src/inventory-count/domain/inventory-count.entity';
import { PrismaService } from 'src/prisma/prisma.service';

const InventoryCountPrismaValidator =
  Prisma.validator<Prisma.InventoryCountDefaultArgs>()({
    include: { inventoryCountItems: true },
  });

export type InventoryCountDbRecord = Prisma.InventoryCountGetPayload<
  typeof InventoryCountPrismaValidator
>;

@Injectable()
export class PrismaInventoryCountAdapter
  extends RepositoryBase<InventoryCountEntity>
  implements InventoryCountRepositoryPort
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: InventoryCountMapper,
  ) {
    super(prisma);
  }

  async create(entity: InventoryCountEntity): Promise<void> {
    await this.prisma.inventoryCount.create({
      data: this.mapToInventoryCountDbRecord(entity),
    });
  }

  mapToInventoryCountDbRecord(
    entity: InventoryCountEntity,
  ): Omit<InventoryCountDbRecord, 'inventoryCountItems'> {
    const props = entity.getProps();

    return {
      inventoryCountTemplateId: props.inventoryCountTemplateId,
      staffName: props.staffName,
      id: props.id,
      createdAt: props.createdAt,
      modifiedAt: props.updatedAt,
    };
  }

  async findById(id: string): Promise<InventoryCountEntity | null> {
    const inventoryCount = await this.prisma.inventoryCount.findUnique({
      ...InventoryCountPrismaValidator,
      where: { id },
    });

    return inventoryCount && this.mapper.toDomain(inventoryCount);
  }

  update(entity: InventoryCountEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(entity: InventoryCountEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<InventoryCountEntity[]> {
    throw new Error('Method not implemented.');
  }

  findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<InventoryCountEntity>> {
    throw new Error('Method not implemented.');
  }
}
