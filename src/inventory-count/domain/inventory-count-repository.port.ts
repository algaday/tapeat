import { IRepository } from 'src/core/domain/repository.interface';
import { InventoryCountItemEntity } from './inventory-count-item.entity';
import { InventoryCountEntity } from './inventory-count.entity';

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

  findByIds(inventoryCountIds: string[]): Promise<InventoryCountEntity[]>;
}

export const InventoryCountRepositoryPort: unique symbol = Symbol(
  'INVENTORY_COUNT_REPOSITORY',
);
