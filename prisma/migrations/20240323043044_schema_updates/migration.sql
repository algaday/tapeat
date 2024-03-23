/*
  Warnings:

  - You are about to drop the column `menuItemId` on the `Modification` table. All the data in the column will be lost.
  - You are about to drop the column `modificationId` on the `ModificationGroup` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `ModificationGroup` table. All the data in the column will be lost.
  - You are about to drop the column `menuId` on the `OrderLine` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[modificationGroupId,name]` on the table `Modification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,menuItemId]` on the table `ModificationGroup` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `modificationGroupId` to the `Modification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menuItemId` to the `ModificationGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menuItemId` to the `OrderLine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Modification" DROP CONSTRAINT "Modification_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "ModificationGroup" DROP CONSTRAINT "ModificationGroup_modificationId_fkey";

-- DropForeignKey
ALTER TABLE "OrderLine" DROP CONSTRAINT "OrderLine_menuId_fkey";

-- DropIndex
DROP INDEX "Modification_name_menuItemId_key";

-- DropIndex
DROP INDEX "ModificationGroup_modificationId_name_key";

-- AlterTable
ALTER TABLE "Modification" DROP COLUMN "menuItemId",
ADD COLUMN     "modificationGroupId" INTEGER NOT NULL,
ADD COLUMN     "price" DECIMAL(12,2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ModificationGroup" DROP COLUMN "modificationId",
DROP COLUMN "price",
ADD COLUMN     "menuItemId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderLine" DROP COLUMN "menuId",
ADD COLUMN     "menuItemId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Modification_modificationGroupId_name_key" ON "Modification"("modificationGroupId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "ModificationGroup_name_menuItemId_key" ON "ModificationGroup"("name", "menuItemId");

-- AddForeignKey
ALTER TABLE "ModificationGroup" ADD CONSTRAINT "ModificationGroup_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modification" ADD CONSTRAINT "Modification_modificationGroupId_fkey" FOREIGN KEY ("modificationGroupId") REFERENCES "ModificationGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLine" ADD CONSTRAINT "OrderLine_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
