/*
  Warnings:

  - You are about to drop the column `component_id` on the `Variation` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Variation` table. All the data in the column will be lost.
  - You are about to drop the `Component` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `menuItemId` to the `Variation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Component" DROP CONSTRAINT "Component_menuItem_id_fkey";

-- DropForeignKey
ALTER TABLE "Variation" DROP CONSTRAINT "Variation_component_id_fkey";

-- AlterTable
ALTER TABLE "Variation" DROP COLUMN "component_id",
DROP COLUMN "price",
ADD COLUMN     "menuItemId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Component";

-- CreateTable
CREATE TABLE "VariationChoice" (
    "id" SERIAL NOT NULL,
    "variationId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "VariationChoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Variation" ADD CONSTRAINT "Variation_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariationChoice" ADD CONSTRAINT "VariationChoice_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "Variation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
