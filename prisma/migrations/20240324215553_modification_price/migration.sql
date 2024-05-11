/*
  Warnings:

  - Added the required column `price` to the `MenuItemWithModification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuItemWithModification" ADD COLUMN     "price" DECIMAL(12,2) NOT NULL;
