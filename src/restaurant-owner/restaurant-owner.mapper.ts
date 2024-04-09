import { plainToClass } from 'class-transformer';
import { RestaurantOwnerDto } from './dto';
import { User } from '@prisma/client';

export class RestaurantOwnerMapper {
  static toDto(entity: User): RestaurantOwnerDto {
    return plainToClass(RestaurantOwnerDto, entity, {
      excludeExtraneousValues: true,
    });
  }
}
