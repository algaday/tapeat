import { IRepository } from 'src/core/domain/repository.interface';
import { InventoryCountEntity } from './inventory-count.entity';

export interface InventoryCountRepositoryPort
  extends IRepository<InventoryCountEntity> {}

export const InventoryCountRepositoryPort: unique symbol = Symbol(
  'INVENTORY_COUNT_REPOSITORY',
);
