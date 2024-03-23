/*
  Warnings:

  - You are about to drop the column `image` on the `MenuItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "MenuItemImage" (
    "id" SERIAL NOT NULL,
    "originalPath" TEXT NOT NULL,
    "thumbnailPath" TEXT NOT NULL,
    "menuItemId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MenuItemImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MenuItemImage_menuItemId_key" ON "MenuItemImage"("menuItemId");

-- AddForeignKey
ALTER TABLE "MenuItemImage" ADD CONSTRAINT "MenuItemImage_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
