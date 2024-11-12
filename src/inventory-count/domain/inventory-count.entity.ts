import { Entity } from 'src/core/domain/entity.base';
import { InventoryCountItemEntity } from './inventory-count-item.entity';

interface Props {
  staffName: string;
  inventoryCountTemplateId: string;
  status: InventoryCountStatus;
  inventoryCountItems: InventoryCountItemEntity[];
  branchName: string;
}

export enum InventoryCountItemType {
  INGREDIENT = 'ingredient',
  RECIPE = 'recipe',
}

export enum InventoryCountStatus {
  PENDING = 'pending',
  AWAITING_APPROVAL = 'awaitingApproval',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class InventoryCountEntity extends Entity<Props> {
  static create(props: Omit<Props, 'status'> & Partial<Pick<Props, 'status'>>) {
    const defaultedProps: Props = {
      ...props,
      status: props.status ?? InventoryCountStatus.PENDING,
    };

    return new InventoryCountEntity({ props: defaultedProps });
  }
}
