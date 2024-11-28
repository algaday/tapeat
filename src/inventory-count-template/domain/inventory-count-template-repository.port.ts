import { IRepository } from 'src/core/domain/repository.interface';
import { InventoryCountTemplateEntity } from './inventory-count-template.entity';

export interface InventoryCountTemplateRepositoryPort
  extends IRepository<InventoryCountTemplateEntity> {
  assignStorage(
    inventoryCountTemplateId: string,
    storageId: string,
  ): Promise<void>;
}

export const InventoryCountTemplateRepositoryPort: unique symbol = Symbol(
  'INVENTORY_COUNT_TEMPLATE_REPOSITORY',
);
