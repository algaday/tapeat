-- DropForeignKey
ALTER TABLE "InventoryCountItem" DROP CONSTRAINT "InventoryCountItem_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "InventoryCountItem" DROP CONSTRAINT "InventoryCountItem_recipeId_fkey";

-- AlterTable
ALTER TABLE "InventoryCountItem" ALTER COLUMN "ingredientId" DROP NOT NULL,
ALTER COLUMN "recipeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "InventoryCountItem" ADD CONSTRAINT "InventoryCountItem_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryCountItem" ADD CONSTRAINT "InventoryCountItem_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
