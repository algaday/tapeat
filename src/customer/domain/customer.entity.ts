import { Entity } from 'src/core/domain/entity.base';

interface Props {
  name: string;
  address: string;
  phoneNumber: string;
  countryCode: string;
}

export class CustomerEntity extends Entity<Props> {
  static create(props: Props) {
    return new CustomerEntity({ props });
  }
}
