import { Module } from '@nestjs/common';
import { IngredientModule } from 'src/ingredient/ingredient.module';
import { InventoryCountTemplateModule } from 'src/inventory-count-template/infra/framework/inventory-count-template.module';
import { InventoryCountMapper } from 'src/inventory-count/application/mappers/inventory-count.mapper';
import {
  INVENTORY_COUNT_APPLICATION_SERVICES,
  INVENTORY_COUNT_USE_CASES,
} from 'src/inventory-count/application/use-cases';
import { InventoryCountRepositoryPort } from 'src/inventory-count/domain/inventory-count-repository.port';
import { InventoryCountController } from 'src/inventory-count/presentation/inventory-count.controller';
import { RecipeModule } from 'src/recipe/infra/framework/recipe.module';
import { PrismaInventoryCountAdapter } from '../repository/prisma.inventory-count.adapter';
import { NotificationModule } from 'src/notification/infra/framework/notification.module';

const REPOSITORIES = [
  {
    provide: InventoryCountRepositoryPort,
    useClass: PrismaInventoryCountAdapter,
  },
];

@Module({
  imports: [
    IngredientModule,
    RecipeModule,
    InventoryCountTemplateModule,
    NotificationModule,
  ],
  controllers: [InventoryCountController],
  providers: [
    InventoryCountMapper,
    ...REPOSITORIES,
    ...INVENTORY_COUNT_USE_CASES,
    ...INVENTORY_COUNT_APPLICATION_SERVICES,
  ],
})
export class InventoryCountModule {}
