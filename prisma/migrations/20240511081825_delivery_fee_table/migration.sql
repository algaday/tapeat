-- CreateTable
CREATE TABLE "DeliveryFee" (
    "id" UUID NOT NULL,
    "restaurantId" UUID NOT NULL,
    "minTotalPrice" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "maxTotalPrice" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "fee" DECIMAL(12,2) NOT NULL DEFAULT 0,

    CONSTRAINT "DeliveryFee_pkey" PRIMARY KEY ("id")
);
