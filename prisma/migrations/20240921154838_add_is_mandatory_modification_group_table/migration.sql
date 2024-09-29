/*
  Warnings:

  - You are about to drop the column `isMandatory` on the `Modification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Modification" DROP COLUMN "isMandatory";

-- AlterTable
ALTER TABLE "ModificationGroup" ADD COLUMN     "isMandatory" BOOLEAN NOT NULL DEFAULT false;
