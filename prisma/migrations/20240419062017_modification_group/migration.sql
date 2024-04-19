/*
  Warnings:

  - Added the required column `restaurantId` to the `ModificationGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ModificationGroup" ADD COLUMN     "restaurantId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "ModificationGroup" ADD CONSTRAINT "ModificationGroup_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
