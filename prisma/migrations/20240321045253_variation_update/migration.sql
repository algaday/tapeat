/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Variation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `VariationChoice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Variation_name_key" ON "Variation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "VariationChoice_name_key" ON "VariationChoice"("name");
