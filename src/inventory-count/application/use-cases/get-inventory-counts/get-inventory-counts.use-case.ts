import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/use-case.interface';
import { InventoryCountRepositoryPort } from 'src/inventory-count/domain/inventory-count-repository.port';
import { InventoryCountNotFoundError } from 'src/inventory-count/errors/inventory-count-not-found.error';
import { InventoryCountDto as InventoryCountUi } from 'src/inventory-count/presentation/dto/inventory-count.dto';
import { InventoryCountMapper } from '../../mappers/inventory-count.mapper';

interface Props {
  inventoryCountIds: string[];
}

@Injectable()
export class GetInventoryCountsUseCase
  implements UseCase<Props, InventoryCountUi[]>
{
  constructor(
    private readonly mapper: InventoryCountMapper,

    @Inject(InventoryCountRepositoryPort)
    private readonly inventoryCountRepository: InventoryCountRepositoryPort,
  ) {}

  async execute(props: Props): Promise<InventoryCountUi[]> {
    const inventoryCounts = await this.inventoryCountRepository.findByIds(
      props.inventoryCountIds,
    );

    if (!inventoryCounts) {
      throw new InventoryCountNotFoundError();
    }

    return inventoryCounts.map((count) => this.mapper.toUi(count));
  }
}
