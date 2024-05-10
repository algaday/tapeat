import { Prisma } from '@prisma/client';

export type MenuItemWithPayload = Prisma.MenuItemGetPayload<{
  include: {
    modificationGroups: {
      include: {
        modificationGroup: { include: { modifications: true } };
      };
    };
  };
}>;

export type MenuItemModificationGroupWithPayload =
  Prisma.MenuItemModificationGroupGetPayload<{
    include: { modificationGroup: { include: { modifications: true } } };
  }>;
