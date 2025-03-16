import { IRepository } from 'src/core/domain/repository.interface';
import { InventoryCountItemEntity } from './inventory-count-item.entity';
import {
  InventoryCountEntity,
  InventoryCountStatus,
} from './inventory-count.entity';

export interface InventoryCountRepositoryPort
  extends IRepository<InventoryCountEntity> {
  updateInventoryCountItem(params: {
    entity: InventoryCountItemEntity;
    inventoryCountId: string;
  }): Promise<void>;

  findInventoryCountItemById(
    inventoryCountItemId: string,
  ): Promise<InventoryCountItemEntity>;

  createInventoryCountItems(params: {
    items: InventoryCountItemEntity[];
    inventoryCountId: string;
  }): Promise<void>;

  findByIds(params: {
    inventoryCountIds: string[];
    status: InventoryCountStatus;
  }): Promise<InventoryCountEntity[]>;
}

export const InventoryCountRepositoryPort: unique symbol = Symbol(
  'INVENTORY_COUNT_REPOSITORY',
);
