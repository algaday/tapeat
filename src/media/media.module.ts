import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { S3Module } from 'src/s3/s3.module';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({
  imports: [S3Module, RestaurantModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
