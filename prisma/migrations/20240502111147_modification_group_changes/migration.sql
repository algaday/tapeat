-- AlterTable
ALTER TABLE "Modification" ADD COLUMN     "mandatory" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ModificationGroup" ADD COLUMN     "maximumModifierSelection" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "minimunModifierSelection" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "required" BOOLEAN NOT NULL DEFAULT false;
