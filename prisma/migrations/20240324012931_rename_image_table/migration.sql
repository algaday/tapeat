/*
  Warnings:

  - You are about to drop the `MenuItemImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MenuItem" DROP CONSTRAINT "MenuItem_imageId_fkey";

-- DropIndex
DROP INDEX "MenuItem_imageId_key";

-- DropTable
DROP TABLE "MenuItemImage";

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "originalPath" TEXT NOT NULL,
    "thumbnailPath" TEXT,
    "isAssigned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
