import { Unit } from 'src/constants/enums/unit.enum';
import { Entity } from 'src/core/domain/entity.base';
import { InventoryCountItemType } from './inventory-count.entity';

interface Props {
  itemId: string;
  type: InventoryCountItemType;
  quantity: number | null;
  storageName: string;
  name: string;
  unit: Unit;
}

export class InventoryCountItemEntity extends Entity<Props> {
  static create(props: Props) {
    return new InventoryCountItemEntity({ props });
  }
}
