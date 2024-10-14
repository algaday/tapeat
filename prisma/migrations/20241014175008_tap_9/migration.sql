/*
  Warnings:

  - You are about to drop the column `storegeId` on the `InventoryCountTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `inventoryCountTempleteId` on the `InventoryCountTemplateStorage` table. All the data in the column will be lost.
  - You are about to drop the column `storegeId` on the `InventoryCountTemplateStorage` table. All the data in the column will be lost.
  - You are about to drop the `RecipeIngredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StorageIngredient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `storageId` to the `InventoryCountTemplate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inventoryCountTemplateId` to the `InventoryCountTemplateStorage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storageId` to the `InventoryCountTemplateStorage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InventoryCountTemplateStorage" DROP CONSTRAINT "InventoryCountTemplateStorage_inventoryCountTempleteId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryCountTemplateStorage" DROP CONSTRAINT "InventoryCountTemplateStorage_storegeId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_subRecipeId_fkey";

-- DropForeignKey
ALTER TABLE "StorageIngredient" DROP CONSTRAINT "StorageIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "StorageIngredient" DROP CONSTRAINT "StorageIngredient_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "StorageIngredient" DROP CONSTRAINT "StorageIngredient_storageId_fkey";

-- AlterTable
ALTER TABLE "InventoryCountTemplate" DROP COLUMN "storegeId",
ADD COLUMN     "storageId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "InventoryCountTemplateStorage" DROP COLUMN "inventoryCountTempleteId",
DROP COLUMN "storegeId",
ADD COLUMN     "inventoryCountTemplateId" UUID NOT NULL,
ADD COLUMN     "storageId" UUID NOT NULL;

-- DropTable
DROP TABLE "RecipeIngredient";

-- DropTable
DROP TABLE "StorageIngredient";

-- CreateTable
CREATE TABLE "RecipeItem" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "recipeId" UUID NOT NULL,
    "ingredientId" UUID,
    "subRecipeId" UUID,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "RecipeItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StorageItem" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "storageId" UUID NOT NULL,
    "ingredientId" UUID,
    "recipeId" UUID,

    CONSTRAINT "StorageItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecipeItem" ADD CONSTRAINT "RecipeItem_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeItem" ADD CONSTRAINT "RecipeItem_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeItem" ADD CONSTRAINT "RecipeItem_subRecipeId_fkey" FOREIGN KEY ("subRecipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageItem" ADD CONSTRAINT "StorageItem_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageItem" ADD CONSTRAINT "StorageItem_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageItem" ADD CONSTRAINT "StorageItem_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryCountTemplateStorage" ADD CONSTRAINT "InventoryCountTemplateStorage_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryCountTemplateStorage" ADD CONSTRAINT "InventoryCountTemplateStorage_inventoryCountTemplateId_fkey" FOREIGN KEY ("inventoryCountTemplateId") REFERENCES "InventoryCountTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
