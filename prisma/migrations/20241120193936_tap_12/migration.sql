/*
  Warnings:

  - A unique constraint covering the columns `[secretCode]` on the table `NotificationSubscriptionCode` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NotificationSubscriptionCode_secretCode_key" ON "NotificationSubscriptionCode"("secretCode");
