import { MenuItemCategory } from '@prisma/client';

export class GetCategoryMapper {
  static toRespone(entity: MenuItemCategory) {
    const { id, name } = entity;

    return { id, name };
  }
}
