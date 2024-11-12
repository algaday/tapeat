-- DropForeignKey
ALTER TABLE "StorageItem" DROP CONSTRAINT "StorageItem_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "StorageItem" DROP CONSTRAINT "StorageItem_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "StorageItem" DROP CONSTRAINT "StorageItem_storageId_fkey";

-- AddForeignKey
ALTER TABLE "StorageItem" ADD CONSTRAINT "StorageItem_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageItem" ADD CONSTRAINT "StorageItem_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageItem" ADD CONSTRAINT "StorageItem_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
