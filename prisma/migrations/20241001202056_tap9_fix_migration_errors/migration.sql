/*
  Warnings:

  - You are about to drop the column `restaurantBranchId` on the `BranchMenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `countryCode` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `MenuItem` table. All the data in the column will be lost.
  - You are about to drop the column `isMandatory` on the `ModificationGroup` table. All the data in the column will be lost.
  - You are about to drop the column `isMultipleChoice` on the `ModificationGroup` table. All the data in the column will be lost.
  - You are about to drop the `MenuItemCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `branchRestaurantId` to the `BranchMenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BranchMenuItem" DROP CONSTRAINT "BranchMenuItem_restaurantBranchId_fkey";

-- DropForeignKey
ALTER TABLE "MenuItem" DROP CONSTRAINT "MenuItem_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "MenuItemCategory" DROP CONSTRAINT "MenuItemCategory_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "MenuItemModificationGroup" DROP CONSTRAINT "MenuItemModificationGroup_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "MenuItemModificationGroup" DROP CONSTRAINT "MenuItemModificationGroup_modificationId_fkey";

-- DropIndex
DROP INDEX "Customer_phoneNumber_countryCode_key";

-- AlterTable
ALTER TABLE "BranchMenuItem" DROP COLUMN "restaurantBranchId",
ADD COLUMN     "branchRestaurantId" UUID NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "countryCode",
DROP COLUMN "name",
DROP COLUMN "phoneNumber",
ADD COLUMN     "userId" UUID NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "categoryId",
ADD COLUMN     "category" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Modification" ADD COLUMN     "isMandatory" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ModificationGroup" DROP COLUMN "isMandatory",
DROP COLUMN "isMultipleChoice",
ADD COLUMN     "maximumModifierSelection" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "minimunModifierSelection" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "RestaurantBranch" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "RestaurantOwner" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- DropTable
DROP TABLE "MenuItemCategory";

-- DropTable
DROP TABLE "Supplier";

-- CreateIndex
CREATE UNIQUE INDEX "Customer_userId_key" ON "Customer"("userId");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BranchMenuItem" ADD CONSTRAINT "BranchMenuItem_branchRestaurantId_fkey" FOREIGN KEY ("branchRestaurantId") REFERENCES "RestaurantBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItemModificationGroup" ADD CONSTRAINT "MenuItemModificationGroup_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItemModificationGroup" ADD CONSTRAINT "MenuItemModificationGroup_modificationId_fkey" FOREIGN KEY ("modificationId") REFERENCES "ModificationGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
