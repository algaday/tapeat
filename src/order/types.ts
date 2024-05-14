import { MenuItem, Modification, Prisma } from '@prisma/client';

export type MenuItemWithModificationGroups = Prisma.MenuItemGetPayload<{
  include: {
    modificationGroups: {
      include: {
        modificationGroup: { include: { modifications: true } };
      };
    };
  };
}>;

export type ModifiedMenuItem = MenuItem & { modifications: Modification[] };

export type MenuItemModificationGroupWithPayload =
  Prisma.MenuItemModificationGroupGetPayload<{
    include: { modificationGroup: { include: { modifications: true } } };
  }>;
