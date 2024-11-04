import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/use-case.interface';
import { InventoryCountTemplateRepositoryPort } from 'src/inventory-count-template/domain/inventory-count-template-repository.port';
import { InventoryCountTemplateNotFoundError } from 'src/inventory-count-template/errors/inventory-count-template-not-found.error';
import { InventoryCountItemEntity } from 'src/inventory-count/domain/inventory-count-item.entity';
import { InventoryCountRepositoryPort } from 'src/inventory-count/domain/inventory-count-repository.port';
import {
  InventoryCountEntity,
  InventoryCountItemType,
} from 'src/inventory-count/domain/inventory-count.entity';
import { InventoryCountWithStorageDto as InventoryCountUi } from 'src/inventory-count/presentation/dto/inventory-count.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { InventoryCountMapper } from '../../mappers/inventory-count.mapper';

interface Props {
  inventoryCountTemplateId: string;
  staffName: string;
}

@Injectable()
export class CreateInventoryCountUseCase
  implements UseCase<Props, InventoryCountUi>
{
  constructor(
    private readonly mapper: InventoryCountMapper,
    private readonly prisma: PrismaService,

    @Inject(InventoryCountRepositoryPort)
    private readonly inventoryCountRepository: InventoryCountRepositoryPort,

    @Inject(InventoryCountTemplateRepositoryPort)
    private readonly inventoryCountTemplateRepository: InventoryCountTemplateRepositoryPort,
  ) {}

  async execute(props: Props): Promise<InventoryCountUi> {
    return await this.prisma.$transaction(async () => {
      const detailedTemplate =
        await this.inventoryCountTemplateRepository.findTemplateStoragesWithItems(
          props.inventoryCountTemplateId,
        );

      if (!detailedTemplate) {
        throw new InventoryCountTemplateNotFoundError(
          `InventoryCountTemplate with ID ${props.inventoryCountTemplateId} not found.`,
        );
      }

      const inventoryCountItems = detailedTemplate.storages.flatMap(
        (templateStorage) =>
          templateStorage.storage.items.map((item) =>
            InventoryCountItemEntity.create({
              storageName: templateStorage.storage.name,
              quantity: null,
              itemId: item.ingredientId ?? item.recipeId,
              type: item.ingredientId
                ? InventoryCountItemType.INGREDIENT
                : InventoryCountItemType.RECIPE,
            }),
          ),
      );

      const inventoryCount = InventoryCountEntity.create({
        ...props,
        inventoryCountItems,
      });

      await this.inventoryCountRepository.create(inventoryCount);

      await this.inventoryCountRepository.createInventoryCountItems({
        items: inventoryCountItems,
        inventoryCountId: inventoryCount.getId(),
      });

      return this.mapper.toUi(inventoryCount);
    });
  }
}
