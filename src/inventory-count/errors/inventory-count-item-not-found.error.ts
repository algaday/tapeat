import { DomainError } from 'src/core/domain/domain-error.base';

export class InventoryCountItemNotFoundError extends DomainError {
  code: string = 'INVENTORY_COUNT_ITEM.NOT_FOUND';
}
