import { DomainError } from 'src/core/domain/domain-error.base';

export class CustomerExistsError extends DomainError {
  code: string = 'CUSTOMER.EXISTS';
}
