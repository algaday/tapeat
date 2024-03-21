/*
  Warnings:

  - A unique constraint covering the columns `[name,menuItemId]` on the table `Variation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[variationId,name]` on the table `VariationChoice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Variation_name_menuItemId_key" ON "Variation"("name", "menuItemId");

-- CreateIndex
CREATE UNIQUE INDEX "VariationChoice_variationId_name_key" ON "VariationChoice"("variationId", "name");
