/*
  Warnings:

  - A unique constraint covering the columns `[type,branchId]` on the table `InventoryCountTemplate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "InventoryCountTemplate_type_branchId_key" ON "InventoryCountTemplate"("type", "branchId");
