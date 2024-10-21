import { Entity } from 'src/core/domain/entity.base';
import { InventoryCountItemType } from './inventory-count.entity';

interface Props {
  itemId: string;
  type: InventoryCountItemType;
  quantity: number;
  storageName: string;
}

export class InventoryCountItemEntity extends Entity<Props> {
  static create(props: Props) {
    return new InventoryCountItemEntity({ props });
  }
}
