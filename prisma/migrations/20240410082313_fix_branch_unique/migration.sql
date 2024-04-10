/*
  Warnings:

  - A unique constraint covering the columns `[restaurantId,address]` on the table `RestaurantBranch` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "RestaurantBranch_id_address_key";

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantBranch_restaurantId_address_key" ON "RestaurantBranch"("restaurantId", "address");
