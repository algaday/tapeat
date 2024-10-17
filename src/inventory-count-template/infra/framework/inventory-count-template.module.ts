import { Module } from '@nestjs/common';
import { InventoryCountTemplateController } from '../..//presentation/inventory-count-template.controller';
import { InventoryCountTemplateRepositoryPort } from 'src/inventory-count-template/domain/inventory-count-template-repository.port';
import { PrismaInventoryCountTemplateAdapter } from '../repository/prisma.inventory-count-template.adapter';
import { InventoryCountTemplateMapper } from 'src/inventory-count-template/application/mappers/inventory-count-template.mapper';
import { INVENTORY_COUNT_TEMPLATE_USE_CASES } from 'src/inventory-count-template/application/use-cases';

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
})
export class InventoryCountTemplateModule {}
