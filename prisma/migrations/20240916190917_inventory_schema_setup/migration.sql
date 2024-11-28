-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('LITRES', 'KG', 'G');

-- CreateEnum
CREATE TYPE "TemplateType" AS ENUM ('nightly', 'daily', 'weekly', 'monthly');

-- CreateTable
CREATE TABLE "Supplier" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "contacts" TEXT NOT NULL,
    "bin" TEXT NOT NULL,

    CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "supplierId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "yield" DECIMAL(4,2) NOT NULL,
    "unit" "Unit" NOT NULL DEFAULT 'G',

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "unit" "Unit" NOT NULL DEFAULT 'G',
    "yield" DECIMAL(4,2) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "recipeId" UUID NOT NULL,
    "ingredientId" UUID,
    "subRecipeId" UUID,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryCount" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryCountIngredient" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "quantity" INTEGER NOT NULL,
    "ingredientId" UUID NOT NULL,
    "inventoryCountId" UUID NOT NULL,

    CONSTRAINT "InventoryCountIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Storage" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "restaurantBranchId" UUID NOT NULL,

    CONSTRAINT "Storage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StorageIngredient" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "storageId" UUID NOT NULL,
    "ingredientId" UUID,
    "recipeId" UUID,

    CONSTRAINT "StorageIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryCountTemplate" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "type" "TemplateType" NOT NULL,
    "storegeId" UUID NOT NULL,

    CONSTRAINT "InventoryCountTemplate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_subRecipeId_fkey" FOREIGN KEY ("subRecipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryCountIngredient" ADD CONSTRAINT "InventoryCountIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryCountIngredient" ADD CONSTRAINT "InventoryCountIngredient_inventoryCountId_fkey" FOREIGN KEY ("inventoryCountId") REFERENCES "InventoryCount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Storage" ADD CONSTRAINT "Storage_restaurantBranchId_fkey" FOREIGN KEY ("restaurantBranchId") REFERENCES "RestaurantBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageIngredient" ADD CONSTRAINT "StorageIngredient_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageIngredient" ADD CONSTRAINT "StorageIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageIngredient" ADD CONSTRAINT "StorageIngredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryCountTemplate" ADD CONSTRAINT "InventoryCountTemplate_storegeId_fkey" FOREIGN KEY ("storegeId") REFERENCES "Storage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
