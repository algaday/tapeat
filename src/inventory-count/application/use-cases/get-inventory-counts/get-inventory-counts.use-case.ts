import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/use-case.interface';
import { InventoryCountTemplateRepositoryPort } from 'src/inventory-count-template/domain/inventory-count-template-repository.port';
import { InventoryCountRepositoryPort } from 'src/inventory-count/domain/inventory-count-repository.port';
import { InventoryCountStatus } from 'src/inventory-count/domain/inventory-count.entity';
import { InventoryCountBaseDto as InventoryCountUi } from 'src/inventory-count/presentation/dto/inventory-counts.dto';
import { InventoryCountMapper } from '../../mappers/inventory-count.mapper';

interface Props {
  inventoryCountIds: string[];
  status: InventoryCountStatus;
}

@Injectable()
export class GetInventoryCountsUseCase
  implements UseCase<Props, InventoryCountUi[]>
{
  constructor(
    private readonly mapper: InventoryCountMapper,

    @Inject(InventoryCountRepositoryPort)
    private readonly inventoryCountRepository: InventoryCountRepositoryPort,

    @Inject(InventoryCountTemplateRepositoryPort)
    private readonly inventoryCountTemplateRepository: InventoryCountTemplateRepositoryPort,
  ) {}

  async execute(props: Props): Promise<InventoryCountUi[]> {
    const inventoryCounts = await this.inventoryCountRepository.findByIds({
      inventoryCountIds: props.inventoryCountIds,
      status: props.status,
    });

    const inventoryCountTemplateIds = [
      ...new Set(
        inventoryCounts.map(
          (inventoryCount) =>
            inventoryCount.getProps().inventoryCountTemplateId,
        ),
      ),
    ];

    const inventoryCountTemplates =
      await this.inventoryCountTemplateRepository.findByIds(
        inventoryCountTemplateIds,
      );

    const inventoryCountTemplateMap = new Map(
      inventoryCountTemplates.map((template) => [template.getId(), template]),
    );

    return inventoryCounts.map((inventoryCount) =>
      this.mapper.toBaseUi({
        entity: inventoryCount,
        inventoryCountTemplate: inventoryCountTemplateMap.get(
          inventoryCount.getProps().inventoryCountTemplateId,
        ),
      }),
    );
  }
}
