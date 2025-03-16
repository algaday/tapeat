import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RestaurantOwnerModule } from './restaurant-owner/restaurant-owner.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MenuModule } from './menu/menu.module';
import { MediaModule } from './media/media.module';
import { CommonModule } from './common/common.module';
import { RestaurantBranchModule } from './restaurant-branch/restaurant-branch.module';
import { ModificationModule } from './modification/modification.module';
import { OrderModule } from './order/order.module';
import { DeliveryFeeTemplateModule } from './delivery-fee-template/delivery-fee-template.module';
import { CategoryModule } from './category/category.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipeModule } from './recipe/infra/framework/recipe.module';
import { StorageModule } from './storage/storage.module';
import { CustomerModule } from './customer/infra/framework/customer.module';
import { InventoryCountTemplateModule } from './inventory-count-template/infra/framework/inventory-count-template.module';
import { InventoryCountModule } from './inventory-count/infra/framework/inventory-count.module';
import { TelegramModule } from './telegram/telegram.module';
import { TelegramChatModule } from './telegram-chat/infra/framework/telegram-chat.module';
import { NotificationSubscriptionCodeModule } from './notification-subscription-code/infra/framework/notification-subscription-code.module';
import { NotificationModule } from './notification/infra/framework/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    RestaurantOwnerModule,
    RestaurantModule,
    MenuModule,
    MediaModule,
    CommonModule,
    RestaurantBranchModule,
    ModificationModule,
    OrderModule,
    CustomerModule,
    DeliveryFeeTemplateModule,
    CategoryModule,
    IngredientModule,
    RecipeModule,
    StorageModule,
    InventoryCountTemplateModule,
    InventoryCountModule,
    TelegramModule,
    TelegramChatModule,
    NotificationSubscriptionCodeModule,
    NotificationModule,
  ],
})
export class AppModule {}
