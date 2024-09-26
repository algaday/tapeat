import { MenuItemCategory } from '@prisma/client';

export class GetCategoriesMapper {
  static toRespone(entity: MenuItemCategory) {
    const { id, name } = entity;

    return { id, name };
  }
}
