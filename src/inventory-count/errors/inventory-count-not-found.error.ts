import { DomainError } from 'src/core/domain/domain-error.base';

export class InventoryCountNotFoundError extends DomainError {
  code: string = 'INVENTORY_COUNT.NOT_FOUND';
}
