import { Module } from '@nestjs/common';
import { S3Service } from './services/s3';
import { SharpService } from './services/sharp';

@Module({
  providers: [S3Service, SharpService],
  exports: [S3Service, SharpService],
})
export class CommonModule {}
