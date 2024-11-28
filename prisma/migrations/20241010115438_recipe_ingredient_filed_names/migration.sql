/*
  Warnings:

  - You are about to drop the column `restaurantBranchId` on the `BranchMenuItem` table. All the data in the column will be lost.
  - You are about to drop the `Supplier` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `branchRestaurantId` to the `BranchMenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BranchMenuItem" DROP CONSTRAINT "BranchMenuItem_restaurantBranchId_fkey";

-- AlterTable
ALTER TABLE "BranchMenuItem" DROP COLUMN "restaurantBranchId",
ADD COLUMN     "branchRestaurantId" UUID NOT NULL;

-- DropTable
DROP TABLE "Supplier";

-- AddForeignKey
ALTER TABLE "BranchMenuItem" ADD CONSTRAINT "BranchMenuItem_branchRestaurantId_fkey" FOREIGN KEY ("branchRestaurantId") REFERENCES "RestaurantBranch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
