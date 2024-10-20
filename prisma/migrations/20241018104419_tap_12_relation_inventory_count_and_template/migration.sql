/*
  Warnings:

  - Added the required column `inventoryCountTemplateId` to the `InventoryCount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InventoryCount" ADD COLUMN     "inventoryCountTemplateId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "InventoryCount" ADD CONSTRAINT "InventoryCount_inventoryCountTemplateId_fkey" FOREIGN KEY ("inventoryCountTemplateId") REFERENCES "InventoryCountTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
