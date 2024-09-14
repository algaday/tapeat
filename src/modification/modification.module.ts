import { Module } from '@nestjs/common';
import { ModificationController } from './modification.controller';
import { ModificationService } from './modification.service';

@Module({
  controllers: [ModificationController],
  providers: [ModificationService],
})
export class ModificationModule {}
