import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/use-case.interface';
import { InventoryCountRepositoryPort } from 'src/inventory-count/domain/inventory-count-repository.port';
import { InventoryCountStatus } from 'src/inventory-count/domain/inventory-count.entity';
import { InventoryCountNotFoundError } from 'src/inventory-count/errors/inventory-count-not-found.error';
import { InventoryCountExtendedDto as InventoryCountUi } from 'src/inventory-count/presentation/dto/inventory-count.dto';
import { InventoryCountMapper } from '../../mappers/inventory-count.mapper';

interface Props {
  staffName?: string;
  inventoryCountId: string;
  status?: InventoryCountStatus;
}

@Injectable()
export class UpdateInventoryCountUseCase
  implements UseCase<Props, InventoryCountUi>
{
  constructor(
    private readonly mapper: InventoryCountMapper,
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

    inventoryCount.update({
      staffName: props.staffName,
      status: props.status,
    });

    await this.inventoryCountRepository.update(inventoryCount);

    return this.mapper.toUi(inventoryCount);
  }
}
