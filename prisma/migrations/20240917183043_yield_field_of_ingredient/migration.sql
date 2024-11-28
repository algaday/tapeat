/*
  Warnings:

  - You are about to alter the column `yield` on the `Ingredient` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Decimal(5,4)`.

*/
-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "yield" SET DATA TYPE DECIMAL(5,4);
