/*
  Warnings:

  - You are about to drop the `Variation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VariationChoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Variation" DROP CONSTRAINT "Variation_menuItemId_fkey";

-- DropForeignKey
ALTER TABLE "VariationChoice" DROP CONSTRAINT "VariationChoice_variationId_fkey";

-- DropTable
DROP TABLE "Variation";

-- DropTable
DROP TABLE "VariationChoice";

-- CreateTable
CREATE TABLE "Modification" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "menuItemId" INTEGER NOT NULL,

    CONSTRAINT "Modification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModificationGroup" (
    "id" SERIAL NOT NULL,
    "modificationId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "ModificationGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Modification_name_menuItemId_key" ON "Modification"("name", "menuItemId");

-- CreateIndex
CREATE UNIQUE INDEX "ModificationGroup_modificationId_name_key" ON "ModificationGroup"("modificationId", "name");

-- AddForeignKey
ALTER TABLE "Modification" ADD CONSTRAINT "Modification_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModificationGroup" ADD CONSTRAINT "ModificationGroup_modificationId_fkey" FOREIGN KEY ("modificationId") REFERENCES "Modification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
