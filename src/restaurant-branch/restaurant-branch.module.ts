import { Module } from '@nestjs/common';
import { RestaurantBranchController } from './restaurant-branch.controller';
import { RestaurantBranchService } from './restaurant-branch.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({
  imports: [PrismaModule, RestaurantModule],
  controllers: [RestaurantBranchController],
  providers: [RestaurantBranchService],
})
export class RestaurantBranchModule {}
