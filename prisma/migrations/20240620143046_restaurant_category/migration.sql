/*
  Warnings:

  - A unique constraint covering the columns `[restaurantId,name]` on the table `MenuItemCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `restaurantId` to the `MenuItemCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MenuItemCategory_name_key";

-- AlterTable
ALTER TABLE "MenuItemCategory" ADD COLUMN     "restaurantId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MenuItemCategory_restaurantId_name_key" ON "MenuItemCategory"("restaurantId", "name");

-- AddForeignKey
ALTER TABLE "MenuItemCategory" ADD CONSTRAINT "MenuItemCategory_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
