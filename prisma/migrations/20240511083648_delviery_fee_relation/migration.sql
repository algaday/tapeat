-- AddForeignKey
ALTER TABLE "DeliveryFee" ADD CONSTRAINT "DeliveryFee_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
