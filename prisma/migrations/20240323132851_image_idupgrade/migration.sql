/*
  Warnings:

  - You are about to drop the column `menuItemId` on the `MenuItemImage` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "MenuItemImage_menuItemId_key";

-- AlterTable
ALTER TABLE "MenuItemImage" DROP COLUMN "menuItemId";
