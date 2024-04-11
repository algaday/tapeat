import { Module } from '@nestjs/common';
import { RestaurantBranchController } from './restaurant-branch.controller';
import { RestaurantBranchService } from './restaurant-branch.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RestaurantBranchController],
  providers: [RestaurantBranchService],
})
export class RestaurantBranchModule {}
