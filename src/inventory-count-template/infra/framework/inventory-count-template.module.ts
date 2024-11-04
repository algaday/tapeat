import { Module } from '@nestjs/common';
import { InventoryCountTemplateMapper } from 'src/inventory-count-template/application/mappers/inventory-count-template.mapper';
import { INVENTORY_COUNT_TEMPLATE_USE_CASES } from 'src/inventory-count-template/application/use-cases';
import { InventoryCountTemplateRepositoryPort } from 'src/inventory-count-template/domain/inventory-count-template-repository.port';
import { InventoryCountTemplateController } from '../..//presentation/inventory-count-template.controller';
import { PrismaInventoryCountTemplateAdapter } from '../repository/prisma.inventory-count-template.adapter';

const REPOSITORIES = [
  {
    provide: InventoryCountTemplateRepositoryPort,
    useClass: PrismaInventoryCountTemplateAdapter,
  },
];

@Module({
  controllers: [InventoryCountTemplateController],
  providers: [
    InventoryCountTemplateMapper,
    ...REPOSITORIES,
    ...INVENTORY_COUNT_TEMPLATE_USE_CASES,
  ],
  exports: [...REPOSITORIES],
})
export class InventoryCountTemplateModule {}
