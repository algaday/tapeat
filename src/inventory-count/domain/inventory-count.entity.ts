import { Entity } from 'src/core/domain/entity.base';
import { InventoryCountItemEntity } from './inventory-count-item.entity';

interface Props {
  staffName: string;
  inventoryCountTemplateId: string;
  inventoryCountItems: InventoryCountItemEntity[];
}

export class InventoryCountEntity extends Entity<Props> {
  static create(props: Props) {
    return new InventoryCountEntity({ props });
  }
}
