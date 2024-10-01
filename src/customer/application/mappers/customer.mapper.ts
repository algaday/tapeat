import { User } from '@prisma/client';
import { CustomerDto } from './presentation/dto/customer.dto';
import { plainToClass } from 'class-transformer';

export class CustomerMapper {
  static toDto(entity: User): CustomerDto {
    return plainToClass(CustomerDto, entity, {
      excludeExtraneousValues: true,
    });
  }
}
