import { Module } from '@nestjs/common';
import { S3Service } from './services/s3';

@Module({
  providers: [S3Service],
  exports: [S3Service],
})
export class CommonModule {}
