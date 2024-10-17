import { Entity } from 'src/core/domain/entity.base';

interface Props {
  templateType: InventoryCountTemplateType;
  branchId: string;
  storageIds?: string[]; //todo: refactor with storage entities later
}

export enum InventoryCountTemplateType {
  NIGHTLY = 'nightly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
}

export class InventoryCountTemplateEntity extends Entity<Props> {
  static create(props: Props) {
    return new InventoryCountTemplateEntity({ props });
  }
}
