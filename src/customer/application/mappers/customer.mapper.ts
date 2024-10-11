import { Mapper } from 'src/core/domain/mapper.interface';
import { CustomerEntity } from 'src/customer/domain/customer.entity';
import { Customer as CustomerDbRecord } from '@prisma/client';
import { CustomerDto as CustomerUi } from 'src/customer/presentation/dto/customer.dto';

export class CustomerMapper
  implements Mapper<CustomerEntity, CustomerDbRecord, CustomerUi>
{
  toPersistence?(entity: CustomerEntity): CustomerDbRecord {
    const props = entity.getProps();

    return {
      id: props.id,
      name: props.name,
      address: props.address,
      phoneNumber: props.phoneNumber,
      countryCode: props.countryCode,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
    };
  }

  toDomain(record: CustomerDbRecord): CustomerEntity {
    return new CustomerEntity({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      props: {
        address: record.address,
        name: record.name,
        countryCode: record.countryCode,
        phoneNumber: record.phoneNumber,
      },
    });
  }

  toUi(entity: CustomerEntity): CustomerUi {
    const props = entity.getProps();

    return {
      id: props.id,
      address: props.address,
      countryCode: props.countryCode,
      phoneNumber: props.phoneNumber,
      name: props.name,
    };
  }
}
