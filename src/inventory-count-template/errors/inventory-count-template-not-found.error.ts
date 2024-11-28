import { DomainError } from 'src/core/domain/domain-error.base';

export class InventoryCountTemplateNotFoundError extends DomainError {
  code: string = 'INVENTORY_COUNT_TEMPLATE.NOT_FOUND';
}
