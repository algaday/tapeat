import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/use-case.interface';
import { InventoryCountRepositoryPort } from 'src/inventory-count/domain/inventory-count-repository.port';
import { InventoryCountEntity } from 'src/inventory-count/domain/inventory-count.entity';
import { InventoryCountDto as InventoryCountUi } from 'src/inventory-count/presentation/dto/inventory-count.dto';
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

    @Inject(InventoryCountRepositoryPort)
    private readonly inventoryCountRepository: InventoryCountRepositoryPort,
  ) {}

  async execute(props: Props): Promise<InventoryCountUi> {
    const inventoryCount = InventoryCountEntity.create({
      ...props,
      inventoryCountItems: [],
    });

    await this.inventoryCountRepository.create(inventoryCount);

    return this.mapper.toUi(inventoryCount);
  }
}
