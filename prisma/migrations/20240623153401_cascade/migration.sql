-- DropForeignKey
ALTER TABLE "MenuItemModificationGroup" DROP CONSTRAINT "MenuItemModificationGroup_modificationId_fkey";

-- AddForeignKey
ALTER TABLE "MenuItemModificationGroup" ADD CONSTRAINT "MenuItemModificationGroup_modificationId_fkey" FOREIGN KEY ("modificationId") REFERENCES "ModificationGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
