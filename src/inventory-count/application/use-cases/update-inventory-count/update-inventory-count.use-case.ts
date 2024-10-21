import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/use-case.interface';
import { InventoryCountRepositoryPort } from 'src/inventory-count/domain/inventory-count-repository.port';
import { InventoryCountDto as InventoryCountUi } from 'src/inventory-count/presentation/dto/inventory-count.dto';
import { InventoryCountMapper } from '../../mappers/inventory-count.mapper';
import { InventoryCountNotFoundError } from 'src/inventory-count/errors/inventory-count-not-found.error';
import { InventoryCountItemService } from '../../services/inventory-count-item.service';
import { InventoryCountItemType } from 'src/inventory-count/domain/inventory-count.entity';

interface Props {
  inventoryCountTemplateId: string;
  staffName: string;
  inventoryCountId: string;
  inventoryCountItems: {
    id: string;
    type: InventoryCountItemType;
    quantity: number;
  }[];
}

@Injectable()
export class UpdateInventoryCountUseCase
  implements UseCase<Props, InventoryCountUi>
{
  constructor(
    private readonly mapper: InventoryCountMapper,
    private readonly inventoryCountItemService: InventoryCountItemService,
    @Inject(InventoryCountRepositoryPort)
    private readonly inventoryCountRepository: InventoryCountRepositoryPort,
  ) {}

  async execute(props: Props): Promise<InventoryCountUi> {
    const inventoryCount = await this.inventoryCountRepository.findById(
      props.inventoryCountId,
    );

    if (!inventoryCount) {
      throw new InventoryCountNotFoundError();
    }

    const inventoryCountItems =
      await this.inventoryCountItemService.getValidatedInventoryCountItems(
        props.inventoryCountItems,
      );

    inventoryCount.update({
      inventoryCountItems,
      staffName: props.staffName,
    });

    await this.inventoryCountRepository.update(inventoryCount);

    return this.mapper.toUi(inventoryCount);
  }
}
