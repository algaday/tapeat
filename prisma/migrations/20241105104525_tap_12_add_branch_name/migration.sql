/*
  Warnings:

  - Added the required column `branchName` to the `InventoryCount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InventoryCount" ADD COLUMN     "branchName" TEXT NOT NULL;
