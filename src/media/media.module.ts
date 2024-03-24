import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule, RestaurantModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
