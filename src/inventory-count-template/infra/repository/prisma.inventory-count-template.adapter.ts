/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RepositoryBase } from 'src/core/domain/repository.base';
import {
  PaginatedQueryParams,
  Paginated,
} from 'src/core/domain/repository.interface';
import { InventoryCountTemplateMapper } from 'src/inventory-count-template/application/mappers/inventory-count-template.mapper';
import { InventoryCountTemplateRepositoryPort } from 'src/inventory-count-template/domain/inventory-count-template-repository.port';
import { InventoryCountTemplateEntity } from 'src/inventory-count-template/domain/inventory-count-template.entity';
import { PrismaService } from 'src/prisma/prisma.service';

const InventoryCountTemplatePrismaValidator =
  Prisma.validator<Prisma.InventoryCountTemplateDefaultArgs>()({
    include: { inventoryCountTemplateStorages: true },
  });

export type InventoryCountTemplateDbRecord =
  Prisma.InventoryCountTemplateGetPayload<
    typeof InventoryCountTemplatePrismaValidator
  >;

@Injectable()
export class PrismaInventoryCountTemplateAdapter
  extends RepositoryBase<InventoryCountTemplateEntity>
  implements InventoryCountTemplateRepositoryPort
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: InventoryCountTemplateMapper,
  ) {
    super(prisma);
  }
  async create(entity: InventoryCountTemplateEntity): Promise<void> {
    await this.prisma.inventoryCountTemplate.create({
      data: this.mapToInventoryCountTemplateDbRecord(entity),
    });
  }

  async assignStorage(
    inventoryCountTemplateId: string,
    storageId: string,
  ): Promise<void> {
    await this.prisma.inventoryCountTemplateStorage.create({
      data: { inventoryCountTemplateId, storageId },
    });
  }

  mapToInventoryCountTemplateDbRecord(
    entity: InventoryCountTemplateEntity,
  ): Omit<InventoryCountTemplateDbRecord, 'inventoryCountTemplateStorages'> {
    const props = entity.getProps();
    return { branchId: props.branchId, id: props.id, type: props.templateType };
  }
  async findById(id: string): Promise<InventoryCountTemplateEntity | null> {
    const inventoryCountTemplate =
      await this.prisma.inventoryCountTemplate.findUnique({
        ...InventoryCountTemplatePrismaValidator,
        where: { id },
      });

    return inventoryCountTemplate
      ? this.mapper.toDomain(inventoryCountTemplate)
      : null;
  }

  update(entity: InventoryCountTemplateEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(entity: InventoryCountTemplateEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<InventoryCountTemplateEntity[]> {
    throw new Error('Method not implemented.');
  }
  findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<InventoryCountTemplateEntity>> {
    throw new Error('Method not implemented.');
  }
}
