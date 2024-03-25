/*
  Warnings:

  - You are about to drop the column `groupId` on the `Modification` table. All the data in the column will be lost.
  - You are about to drop the `MenuItemModification` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[modificationGroupId,name]` on the table `Modification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,menuItemId]` on the table `ModificationGroup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `modificationGroupId` to the `Modification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menuItemId` to the `ModificationGroup` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MenuItemModification" DROP CONSTRAINT "MenuItemModification_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "MenuItemModification" DROP CONSTRAINT "MenuItemModification_modificationId_fkey";

-- DropForeignKey
ALTER TABLE "Modification" DROP CONSTRAINT "Modification_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_ownerId_fkey";

-- AlterTable
ALTER TABLE "Modification" DROP COLUMN "groupId",
ADD COLUMN     "modificationGroupId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "ModificationGroup" ADD COLUMN     "menuItemId" UUID NOT NULL;

-- DropTable
DROP TABLE "MenuItemModification";

-- CreateIndex
CREATE UNIQUE INDEX "Modification_modificationGroupId_name_key" ON "Modification"("modificationGroupId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "ModificationGroup_name_menuItemId_key" ON "ModificationGroup"("name", "menuItemId");

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "RestaurantOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModificationGroup" ADD CONSTRAINT "ModificationGroup_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modification" ADD CONSTRAINT "Modification_modificationGroupId_fkey" FOREIGN KEY ("modificationGroupId") REFERENCES "ModificationGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
