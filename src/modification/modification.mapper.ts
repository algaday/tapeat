import { plainToClass } from 'class-transformer';
import {
  ModificationGroupDto,
  ModificationGroupWithModifications,
} from './dto';

export class ModificationMapper {
  static toDto(
    entity: ModificationGroupWithModifications,
  ): ModificationGroupDto {
    return plainToClass(ModificationGroupDto, entity, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
  }
}
