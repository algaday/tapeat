import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [RestaurantModule, MediaModule],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
