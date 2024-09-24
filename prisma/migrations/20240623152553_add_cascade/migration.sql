-- DropForeignKey
ALTER TABLE "MenuItemModificationGroup" DROP CONSTRAINT "MenuItemModificationGroup_menuItemId_fkey";

-- AddForeignKey
ALTER TABLE "MenuItemModificationGroup" ADD CONSTRAINT "MenuItemModificationGroup_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
