/*
  Warnings:

  - You are about to drop the column `groupName` on the `Modification` table. All the data in the column will be lost.
  - You are about to drop the `MenuItemWithModification` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `groupId` to the `Modification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MenuItemWithModification" DROP CONSTRAINT "MenuItemWithModification_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "MenuItemWithModification" DROP CONSTRAINT "MenuItemWithModification_modificationId_fkey";

-- DropIndex
DROP INDEX "Modification_name_key";

-- AlterTable
ALTER TABLE "Modification" DROP COLUMN "groupName",
ADD COLUMN     "groupId" UUID NOT NULL;

-- DropTable
DROP TABLE "MenuItemWithModification";

-- CreateTable
CREATE TABLE "MenuItemModification" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "menuItemId" UUID NOT NULL,
    "modificationId" UUID NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "MenuItemModification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModificationGroup" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,

    CONSTRAINT "ModificationGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MenuItemModification" ADD CONSTRAINT "MenuItemModification_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItemModification" ADD CONSTRAINT "MenuItemModification_modificationId_fkey" FOREIGN KEY ("modificationId") REFERENCES "Modification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modification" ADD CONSTRAINT "Modification_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "ModificationGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
