import { Entity } from 'src/core/domain/entity.base';

interface Props {
  name: string | null;
  address: string | null;
  phone: string | null;
  coutryCode: string | null;
}

export class CustomerEntity extends Entity<Props> {
  static create(props: Props) {
    return new CustomerEntity({ props });
  }
}
