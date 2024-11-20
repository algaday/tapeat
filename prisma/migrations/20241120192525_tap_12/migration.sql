-- DropForeignKey
ALTER TABLE "NotificationSubscriptionCode" DROP CONSTRAINT "NotificationSubscriptionCode_telegramChatId_fkey";

-- AlterTable
ALTER TABLE "NotificationSubscriptionCode" ALTER COLUMN "telegramChatId" SET DATA TYPE TEXT;
