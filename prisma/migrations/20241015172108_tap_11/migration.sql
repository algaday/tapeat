/*
  Warnings:

  - You are about to drop the column `storageId` on the `InventoryCountTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `restaurantBranchId` on the `Storage` table. All the data in the column will be lost.
  - Added the required column `branchId` to the `InventoryCountTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Storage" DROP CONSTRAINT "Storage_restaurantBranchId_fkey";

-- AlterTable
ALTER TABLE "InventoryCountTemplate" DROP COLUMN "storageId",
ADD COLUMN     "branchId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Storage" DROP COLUMN "restaurantBranchId";

-- AddForeignKey
ALTER TABLE "InventoryCountTemplate" ADD CONSTRAINT "InventoryCountTemplate_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "RestaurantBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
