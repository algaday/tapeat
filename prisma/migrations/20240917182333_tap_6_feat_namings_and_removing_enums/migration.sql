/*
  Warnings:

  - You are about to drop the column `branchRestaurantId` on the `BranchMenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `supplierId` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to alter the column `yield` on the `Recipe` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(5,4)`.
  - Added the required column `restaurantBranchId` to the `BranchMenuItem` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `unit` on the `Ingredient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `InventoryCountTemplate` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `unit` on the `Recipe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "BranchMenuItem" DROP CONSTRAINT "BranchMenuItem_branchRestaurantId_fkey";

-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_supplierId_fkey";

-- AlterTable
ALTER TABLE "BranchMenuItem" DROP COLUMN "branchRestaurantId",
ADD COLUMN     "restaurantBranchId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "supplierId",
DROP COLUMN "unit",
ADD COLUMN     "unit" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InventoryCountTemplate" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "unit",
ADD COLUMN     "unit" TEXT NOT NULL,
ALTER COLUMN "yield" SET DATA TYPE DECIMAL(5,4);

-- DropEnum
DROP TYPE "TemplateType";

-- DropEnum
DROP TYPE "Unit";

-- AddForeignKey
ALTER TABLE "BranchMenuItem" ADD CONSTRAINT "BranchMenuItem_restaurantBranchId_fkey" FOREIGN KEY ("restaurantBranchId") REFERENCES "RestaurantBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
