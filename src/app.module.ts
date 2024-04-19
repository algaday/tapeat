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
  ],
})
export class AppModule {}
