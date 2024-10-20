import { Module } from '@nestjs/common';
import { INVENTORY_COUNT_USE_CASES } from 'src/inventory-count/application/use-cases';
import { InventoryCountRepositoryPort } from 'src/inventory-count/domain/inventory-count-repository.port';
import { PrismaInventoryCountAdapter } from '../repository/prisma.inventory-count.adapter';
import { InventoryCountController } from 'src/inventory-count/presentation/inventory-count.controller';
import { InventoryCountMapper } from 'src/inventory-count/application/mappers/inventory-count.mapper';

const REPOSITORIES = [
  {
    provide: InventoryCountRepositoryPort,
    useClass: PrismaInventoryCountAdapter,
  },
];

@Module({
  controllers: [InventoryCountController],
  providers: [
    InventoryCountMapper,
    ...REPOSITORIES,
    ...INVENTORY_COUNT_USE_CASES,
  ],
})
export class InventoryCountModule {}
