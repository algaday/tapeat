import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/use-case.interface';
import { InventoryCountRepositoryPort } from 'src/inventory-count/domain/inventory-count-repository.port';
import { InventoryCountItemNotFoundError } from 'src/inventory-count/errors/inventory-count-item-not-found.error';
import { InventoryCountItemDto as InventoryCountItemUi } from 'src/inventory-count/presentation/dto/inventory-count.dto';
import { InventoryCountMapper } from '../../mappers/inventory-count.mapper';

interface Props {
  id: string;
  inventoryCountId: string;
  quantity: number;
}

@Injectable()
export class UpdateInventoryCountItemUseCase
  implements UseCase<Props, InventoryCountItemUi>
{
  constructor(
    private readonly mapper: InventoryCountMapper,
    @Inject(InventoryCountRepositoryPort)
    private readonly inventoryCountRepository: InventoryCountRepositoryPort,
  ) {}

  async execute(props: Props): Promise<InventoryCountItemUi> {
    const { id, inventoryCountId } = props;

    const inventoryCountItem =
      await this.inventoryCountRepository.findInventoryCountItemById(id);

    if (!inventoryCountItem) {
      throw new InventoryCountItemNotFoundError();
    }

    inventoryCountItem.update({
      ...inventoryCountItem,
    });

    await this.inventoryCountRepository.updateInventoryCountItem({
      entity: inventoryCountItem,
      inventoryCountId,
    });

    return this.mapper.toInventoryCountItemUi(inventoryCountItem);
  }
}
