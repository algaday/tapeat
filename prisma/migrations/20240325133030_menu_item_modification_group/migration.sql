/*
  Warnings:

  - You are about to drop the column `menuItemId` on the `ModificationGroup` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ModificationGroup" DROP CONSTRAINT "ModificationGroup_menuItemId_fkey";

-- DropIndex
DROP INDEX "ModificationGroup_name_menuItemId_key";

-- AlterTable
ALTER TABLE "ModificationGroup" DROP COLUMN "menuItemId";

-- CreateTable
CREATE TABLE "MenuItemModificationGroup" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "menuItemId" UUID NOT NULL,
    "modificationId" UUID NOT NULL,

    CONSTRAINT "MenuItemModificationGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MenuItemModificationGroup" ADD CONSTRAINT "MenuItemModificationGroup_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItemModificationGroup" ADD CONSTRAINT "MenuItemModificationGroup_modificationId_fkey" FOREIGN KEY ("modificationId") REFERENCES "ModificationGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
