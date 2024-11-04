/*
  Warnings:

  - Added the required column `status` to the `InventoryCount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InventoryCount" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InventoryCountItem" ALTER COLUMN "quantity" DROP NOT NULL,
ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(65,30);
