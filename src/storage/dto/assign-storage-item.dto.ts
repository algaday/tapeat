import { IsArray } from 'class-validator';

export class AssignStorageItemDto {
  @IsArray()
  itemIds: string[];
}
