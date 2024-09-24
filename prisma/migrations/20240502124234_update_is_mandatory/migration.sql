/*
  Warnings:

  - You are about to drop the column `mandatory` on the `Modification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Modification" DROP COLUMN "mandatory",
ADD COLUMN     "isMandatory" BOOLEAN NOT NULL DEFAULT false;
