import { Entity } from 'src/core/domain/entity.base';

interface Props {
  templateType: InventoryCountTemplateType;
  branchId: string;
  storages: { id: string; name: string }[]; //todo: refactor with storage entities later
  name: string;
}

export enum InventoryCountTemplateType {
  NIGHTLY = 'nightly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export class InventoryCountTemplateEntity extends Entity<Props> {
  static create(props: Props) {
    return new InventoryCountTemplateEntity({ props });
  }
}
