/*
  Warnings:

  - You are about to drop the column `group` on the `Modification` table. All the data in the column will be lost.
  - Added the required column `groupName` to the `Modification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Modification" DROP COLUMN "group",
ADD COLUMN     "groupName" TEXT NOT NULL;
