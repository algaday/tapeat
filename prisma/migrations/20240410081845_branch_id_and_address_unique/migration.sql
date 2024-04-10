/*
  Warnings:

  - A unique constraint covering the columns `[id,address]` on the table `RestaurantBranch` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RestaurantBranch_id_address_key" ON "RestaurantBranch"("id", "address");
