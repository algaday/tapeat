/*
  Warnings:

  - You are about to drop the `InventoryCountIngredient` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[inventoryCountTemplateId,storageId]` on the table `InventoryCountTemplateStorage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `staffName` to the `InventoryCount` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InventoryCountIngredient" DROP CONSTRAINT "InventoryCountIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryCountIngredient" DROP CONSTRAINT "InventoryCountIngredient_inventoryCountId_fkey";

-- DropIndex
DROP INDEX "InventoryCountTemplate_type_branchId_key";

-- AlterTable
ALTER TABLE "InventoryCount" ADD COLUMN     "staffName" TEXT NOT NULL;

-- DropTable
DROP TABLE "InventoryCountIngredient";

-- CreateTable
CREATE TABLE "InventoryCountItem" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "quantity" INTEGER NOT NULL,
    "ingredientId" UUID NOT NULL,
    "recipeId" UUID NOT NULL,
    "inventoryCountId" UUID NOT NULL,

    CONSTRAINT "InventoryCountItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InventoryCountTemplateStorage_inventoryCountTemplateId_stor_key" ON "InventoryCountTemplateStorage"("inventoryCountTemplateId", "storageId");

-- AddForeignKey
ALTER TABLE "InventoryCountItem" ADD CONSTRAINT "InventoryCountItem_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryCountItem" ADD CONSTRAINT "InventoryCountItem_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryCountItem" ADD CONSTRAINT "InventoryCountItem_inventoryCountId_fkey" FOREIGN KEY ("inventoryCountId") REFERENCES "InventoryCount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
