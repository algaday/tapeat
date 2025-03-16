-- CreateTable
CREATE TABLE "TelegramChat" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "chatIdAtTelegram" TEXT NOT NULL,
    "restaurantBranchId" UUID NOT NULL,
    "chatType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TelegramChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationSubscriptionCode" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "telegramChatId" UUID NOT NULL,
    "secretCode" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "activatedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationSubscriptionCode_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TelegramChat" ADD CONSTRAINT "TelegramChat_restaurantBranchId_fkey" FOREIGN KEY ("restaurantBranchId") REFERENCES "RestaurantBranch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationSubscriptionCode" ADD CONSTRAINT "NotificationSubscriptionCode_telegramChatId_fkey" FOREIGN KEY ("telegramChatId") REFERENCES "TelegramChat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
