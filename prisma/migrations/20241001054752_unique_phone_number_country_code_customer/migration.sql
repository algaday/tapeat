/*
  Warnings:

  - You are about to drop the column `phoneNumberId` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the `PhoneNumber` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phoneNumber,countryCode]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `countryCode` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_phoneNumberId_fkey";

-- DropIndex
DROP INDEX "Customer_phoneNumberId_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "phoneNumberId",
ADD COLUMN     "countryCode" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- DropTable
DROP TABLE "PhoneNumber";

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phoneNumber_countryCode_key" ON "Customer"("phoneNumber", "countryCode");
