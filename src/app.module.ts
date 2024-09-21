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
import { CustomerModule } from './customer/customer.module';
import { DeliveryFeeTemplateModule } from './delivery-fee-template/delivery-fee-template.module';
import { CategoryModule } from './category/category.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipeModule } from './recipe/recipe.module';

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
  ],
})
export class AppModule {}
