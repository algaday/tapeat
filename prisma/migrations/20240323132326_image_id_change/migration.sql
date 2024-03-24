/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `MenuItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MenuItemImage" DROP CONSTRAINT "MenuItemImage_menuItemId_fkey";

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "imageId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MenuItem_imageId_key" ON "MenuItem"("imageId");

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "MenuItemImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
