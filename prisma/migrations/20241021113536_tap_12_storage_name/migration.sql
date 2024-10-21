/*
  Warnings:

  - Added the required column `modifiedAt` to the `InventoryCountItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storageName` to the `InventoryCountItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InventoryCountItem" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "storageName" TEXT NOT NULL;
