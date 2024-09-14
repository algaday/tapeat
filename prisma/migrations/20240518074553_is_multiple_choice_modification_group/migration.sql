/*
  Warnings:

  - You are about to drop the column `maximumModifierSelection` on the `ModificationGroup` table. All the data in the column will be lost.
  - You are about to drop the column `minimunModifierSelection` on the `ModificationGroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ModificationGroup" DROP COLUMN "maximumModifierSelection",
DROP COLUMN "minimunModifierSelection",
ADD COLUMN     "isMultipleChoice" BOOLEAN NOT NULL DEFAULT false;
