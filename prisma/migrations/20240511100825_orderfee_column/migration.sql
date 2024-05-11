/*
  Warnings:

  - Added the required column `orderFee` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderFee" DECIMAL(12,2) NOT NULL,
ALTER COLUMN "totalAmount" SET DATA TYPE DECIMAL(12,2);
