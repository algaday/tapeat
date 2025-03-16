/*
  Warnings:

  - You are about to drop the column `date` on the `InventoryCount` table. All the data in the column will be lost.
  - Added the required column `modifiedAt` to the `InventoryCount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InventoryCount" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL;
