/*
  Warnings:

  - You are about to drop the `DeliveryFee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DeliveryFee" DROP CONSTRAINT "DeliveryFee_restaurantId_fkey";

-- DropTable
DROP TABLE "DeliveryFee";

-- CreateTable
CREATE TABLE "DeliveryTemplateFee" (
    "id" UUID NOT NULL,
    "restaurantId" UUID NOT NULL,
    "minOrderAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "deliveryFee" DECIMAL(12,2) NOT NULL DEFAULT 0,

    CONSTRAINT "DeliveryTemplateFee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryTemplateFee_restaurantId_minOrderAmount_key" ON "DeliveryTemplateFee"("restaurantId", "minOrderAmount");

-- AddForeignKey
ALTER TABLE "DeliveryTemplateFee" ADD CONSTRAINT "DeliveryTemplateFee_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
