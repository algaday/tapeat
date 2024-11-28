import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { StorageRepository } from './storage.repository';

@Module({
  imports: [],
  controllers: [StorageController],
  providers: [StorageService, StorageRepository],
})
export class StorageModule {}
