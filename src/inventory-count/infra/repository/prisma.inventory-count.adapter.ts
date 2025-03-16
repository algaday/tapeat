/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { RepositoryBase } from 'src/core/domain/repository.base';
import {
  Paginated,
  PaginatedQueryParams,
} from 'src/core/domain/repository.interface';
import { InventoryCountMapper } from 'src/inventory-count/application/mappers/inventory-count.mapper';
import { InventoryCountItemEntity } from 'src/inventory-count/domain/inventory-count-item.entity';
import { InventoryCountRepositoryPort } from 'src/inventory-count/domain/inventory-count-repository.port';
import {
  InventoryCountEntity,
  InventoryCountItemType,
  InventoryCountStatus,
} from 'src/inventory-count/domain/inventory-count.entity';
import { PrismaService } from 'src/prisma/prisma.service';

const InventoryCountPrismaValidator =
  Prisma.validator<Prisma.InventoryCountDefaultArgs>()({
    include: {
      inventoryCountItems: {
        include: {
          ingredient: true,
          recipe: true,
        },
        orderBy: [{ ingredient: { name: 'asc' } }, { recipe: { name: 'asc' } }],
      },
    },
  });

export type InventoryCountDbRecord = Prisma.InventoryCountGetPayload<
  typeof InventoryCountPrismaValidator
>;

export type InventoryCountItemDbRecord =
  InventoryCountDbRecord['inventoryCountItems'][number];

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

  async findByIds(params: {
    inventoryCountIds: string[];
    status: InventoryCountStatus;
  }): Promise<InventoryCountEntity[]> {
    const { inventoryCountIds, status } = params;

    const inventoryCounts = await this.prisma.inventoryCount.findMany({
      ...InventoryCountPrismaValidator,
      where: { id: { in: inventoryCountIds }, status },
    });

    return inventoryCounts.map((count) => {
      const domainEntity = this.mapper.toDomain({
        ...count,
        inventoryCountItems: count.inventoryCountItems || [],
      });
      return domainEntity;
    });
  }

  async findById(id: string): Promise<InventoryCountEntity | null> {
    const inventoryCount = await this.prisma.inventoryCount.findUnique({
      ...InventoryCountPrismaValidator,
      where: { id },
    });

    return inventoryCount && this.mapper.toDomain(inventoryCount);
  }

  async create(entity: InventoryCountEntity): Promise<void> {
    await this.prisma.inventoryCount.create({
      data: this.mapToInventoryCountDbRecord(entity),
    });
  }

  async update(inventoryCount: InventoryCountEntity): Promise<void> {
    await this.prisma.inventoryCount.update({
      where: { id: inventoryCount.getId() },
      data: this.mapToInventoryCountDbRecord(inventoryCount),
    });
  }

  async createInventoryCountItems(params: {
    items: InventoryCountItemEntity[];
    inventoryCountId: string;
  }): Promise<void> {
    const { items, inventoryCountId } = params;
    const inventoryCountItemsData = items.map((item) =>
      this.mapToInventoryCountItemDbRecord({
        inventoryCountId,
        inventoryCountItem: item,
      }),
    );
    await this.prisma.inventoryCountItem.createMany({
      data: inventoryCountItemsData,
    });
  }

  async updateInventoryCountItem(params: {
    entity: InventoryCountItemEntity;
    inventoryCountId: string;
  }): Promise<void> {
    const { entity, inventoryCountId } = params;
    await this.prisma.inventoryCountItem.update({
      data: this.mapToInventoryCountItemDbRecord({
        inventoryCountId,
        inventoryCountItem: entity,
      }),
      where: {
        id: entity.getId(),
      },
    });
  }

  async findInventoryCountItemById(
    inventoryCountItemId: string,
  ): Promise<InventoryCountItemEntity> {
    const inventoryCountItem = await this.prisma.inventoryCountItem.findUnique({
      where: { id: inventoryCountItemId },
      include: {
        ingredient: true,
        recipe: true,
      },
    });

    return (
      inventoryCountItem &&
      this.mapper.toInventoryCountItemDomain(inventoryCountItem)
    );
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
      status: props.status,
      branchName: props.branchName,
    };
  }

  private mapToInventoryCountItemDbRecord(params: {
    inventoryCountItem: InventoryCountItemEntity;
    inventoryCountId: string;
  }): Omit<InventoryCountItemDbRecord, 'recipe' | 'ingredient'> {
    const { inventoryCountId, inventoryCountItem } = params;

    const props = inventoryCountItem.getProps();
    return {
      id: props.id,
      ingredientId:
        props.type === InventoryCountItemType.INGREDIENT ? props.itemId : null,
      recipeId:
        props.type === InventoryCountItemType.RECIPE ? props.itemId : null,
      quantity:
        typeof props.quantity === 'number' ? new Decimal(props.quantity) : null,
      inventoryCountId,
      createdAt: props.createdAt,
      modifiedAt: props.updatedAt,
      storageName: props.storageName,
    };
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
