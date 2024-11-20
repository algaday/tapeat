/*
  Warnings:

  - You are about to drop the column `telegramChatId` on the `NotificationSubscriptionCode` table. All the data in the column will be lost.
  - Added the required column `chatIdAtTelegram` to the `NotificationSubscriptionCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NotificationSubscriptionCode" DROP COLUMN "telegramChatId",
ADD COLUMN     "chatIdAtTelegram" TEXT NOT NULL;
