import { RestaurantBranch } from '@prisma/client';
import { RestaurantBranchDto } from './dto';
import { plainToClass } from 'class-transformer';

export class RestaurantBranchMapper {
  static toDto(entity: RestaurantBranch): RestaurantBranchDto {
    return plainToClass(RestaurantBranchDto, entity, {
      excludeExtraneousValues: true,
    });
  }
}
