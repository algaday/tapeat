import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [RestaurantModule, NestjsFormDataModule],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
