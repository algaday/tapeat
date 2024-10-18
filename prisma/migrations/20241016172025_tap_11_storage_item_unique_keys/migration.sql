/*
  Warnings:

  - A unique constraint covering the columns `[storageId,ingredientId]` on the table `StorageItem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[storageId,recipeId]` on the table `StorageItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StorageItem_storageId_ingredientId_key" ON "StorageItem"("storageId", "ingredientId");

-- CreateIndex
CREATE UNIQUE INDEX "StorageItem_storageId_recipeId_key" ON "StorageItem"("storageId", "recipeId");
