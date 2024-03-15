import { Module } from '@nestjs/common';
import { RestaurantOwnerController } from './restaurant-owner.controller';
import { RestaurantOwnerService } from './restaurant-owner.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [AuthModule, JwtModule.register({})],
  controllers: [RestaurantOwnerController],
  providers: [RestaurantOwnerService],
})
export class RestaurantOwnerModule {}
