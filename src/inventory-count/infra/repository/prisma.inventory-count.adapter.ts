/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable } from '@nestjs/common';
import {
  InventoryCountItem as InventoryCountItemDbRecord,
  Prisma,
} from '@prisma/client';
import { RepositoryBase } from 'src/core/domain/repository.base';
import {
  PaginatedQueryParams,
  Paginated,
} from 'src/core/domain/repository.interface';
import { InventoryCountTemplateNotFoundError } from 'src/inventory-count-template/errors/inventory-count-template-not-found.error';
import { InventoryCountMapper } from 'src/inventory-count/application/mappers/inventory-count.mapper';
import { InventoryCountItemEntity } from 'src/inventory-count/domain/inventory-count-item.entity';
import { InventoryCountRepositoryPort } from 'src/inventory-count/domain/inventory-count-repository.port';
import {
  InventoryCountEntity,
  InventoryCountItemType,
} from 'src/inventory-count/domain/inventory-count.entity';
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
    await this.prisma.$transaction(async () => {
      const inventoryCount = await this.prisma.inventoryCount.create({
        data: this.mapToInventoryCountDbRecord(entity),
      });

      const templateStorages =
        await this.prisma.inventoryCountTemplate.findUnique({
          where: { id: entity.getProps().inventoryCountTemplateId },
          include: {
            storages: {
              include: {
                storage: {
                  include: {
                    items: true,
                  },
                },
              },
            },
          },
        });

      if (!templateStorages) {
        throw new InventoryCountTemplateNotFoundError(
          `InventoryCountTemplate with ID ${entity.getProps().inventoryCountTemplateId} not found.`,
        );
      }

      const inventoryCountItems = templateStorages.storages.flatMap(
        (templateStorage) =>
          templateStorage.storage.items.map((item) => ({
            inventoryCountId: inventoryCount.id,
            storageName: templateStorage.storage.name,
            ingredientId: item.ingredientId ?? null,
            recipeId: item.recipeId ?? null,
            quantity: 0,
          })),
      );

      if (inventoryCountItems.length > 0) {
        await this.prisma.inventoryCountItem.createMany({
          data: inventoryCountItems,
        });
      }
    });
  }

  private mapToInventoryCountDbRecord(
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
  private mapToInventoryCountItemDbRecord(
    inventoryCountId: string,
    inventoryCountItem: InventoryCountItemEntity,
  ): InventoryCountItemDbRecord {
    const props = inventoryCountItem.getProps();

    return {
      id: props.id,
      ingredientId:
        props.type === InventoryCountItemType.INGREDIENT ? props.itemId : null,
      recipeId:
        props.type === InventoryCountItemType.RECIPE ? props.itemId : null,
      quantity: props.quantity,
      inventoryCountId,
      createdAt: props.createdAt,
      modifiedAt: props.updatedAt,
      storageName: props.storageName,
    };
  }

  async findById(id: string): Promise<InventoryCountEntity | null> {
    const inventoryCount = await this.prisma.inventoryCount.findUnique({
      ...InventoryCountPrismaValidator,
      where: { id },
    });

    return inventoryCount && this.mapper.toDomain(inventoryCount);
  }

  async update(inventoryCount: InventoryCountEntity): Promise<void> {
    await this.prisma.$transaction(async () => {
      await this.prisma.inventoryCount.update({
        where: { id: inventoryCount.getId() },
        data: this.mapToInventoryCountDbRecord(inventoryCount),
      });

      const updateInventoryCountItems = inventoryCount
        .getProps()
        .inventoryCountItems.map(async (item) =>
          this.prisma.inventoryCountItem.upsert({
            where: { id: item.getId() },
            create: this.mapToInventoryCountItemDbRecord(
              inventoryCount.getId(),
              item,
            ),
            update: this.mapToInventoryCountItemDbRecord(
              inventoryCount.getId(),
              item,
            ),
          }),
        );

      const updatedInventoryCountItems = await Promise.all(
        updateInventoryCountItems,
      );

      await this.prisma.inventoryCountItem.deleteMany({
        where: {
          inventoryCountId: inventoryCount.getId(),
          id: {
            notIn: updatedInventoryCountItems.map(({ id }) => id),
          },
        },
      });
    });
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
