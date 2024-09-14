-- DropForeignKey
ALTER TABLE "ModificationGroup" DROP CONSTRAINT "ModificationGroup_restaurantId_fkey";

-- AddForeignKey
ALTER TABLE "ModificationGroup" ADD CONSTRAINT "ModificationGroup_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
