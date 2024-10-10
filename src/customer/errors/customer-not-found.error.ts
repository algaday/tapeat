import { DomainError } from 'src/core/domain/domain-error.base';

export class CustomerNotFoundError extends DomainError {
  code: string = 'CUSTOMER.NOT_FOUND';
}
