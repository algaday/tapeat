-- DropForeignKey
ALTER TABLE "Modification" DROP CONSTRAINT "Modification_modificationGroupId_fkey";

-- AddForeignKey
ALTER TABLE "Modification" ADD CONSTRAINT "Modification_modificationGroupId_fkey" FOREIGN KEY ("modificationGroupId") REFERENCES "ModificationGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
