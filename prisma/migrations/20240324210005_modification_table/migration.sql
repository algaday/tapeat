/*
  Warnings:

  - You are about to drop the column `modificationGroupId` on the `Modification` table. All the data in the column will be lost.
  - You are about to drop the `ModificationGroup` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Modification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `group` to the `Modification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Modification" DROP CONSTRAINT "Modification_modificationGroupId_fkey";

-- DropForeignKey
ALTER TABLE "ModificationGroup" DROP CONSTRAINT "ModificationGroup_menuItemId_fkey";

-- DropIndex
DROP INDEX "Modification_modificationGroupId_name_key";

-- AlterTable
ALTER TABLE "Modification" DROP COLUMN "modificationGroupId",
ADD COLUMN     "group" TEXT NOT NULL;

-- DropTable
DROP TABLE "ModificationGroup";

-- CreateTable
CREATE TABLE "MenuItemWithModification" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "menuItemId" UUID NOT NULL,
    "modificationId" UUID NOT NULL,

    CONSTRAINT "MenuItemWithModification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Modification_name_key" ON "Modification"("name");

-- AddForeignKey
ALTER TABLE "MenuItemWithModification" ADD CONSTRAINT "MenuItemWithModification_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItemWithModification" ADD CONSTRAINT "MenuItemWithModification_modificationId_fkey" FOREIGN KEY ("modificationId") REFERENCES "Modification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
