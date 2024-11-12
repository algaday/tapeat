import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/use-case.interface';
import { InventoryCountTemplateRepositoryPort } from 'src/inventory-count-template/domain/inventory-count-template-repository.port';
import { InventoryCountTemplateNotFoundError } from 'src/inventory-count-template/errors/inventory-count-template-not-found.error';
import { InventoryCountRepositoryPort } from 'src/inventory-count/domain/inventory-count-repository.port';
import { InventoryCountNotFoundError } from 'src/inventory-count/errors/inventory-count-not-found.error';
import { InventoryCountExtendedDto as InventoryCountUi } from 'src/inventory-count/presentation/dto/inventory-count.dto';
import { InventoryCountMapper } from '../../mappers/inventory-count.mapper';

interface Props {
  inventoryCountId: string;
}

@Injectable()
export class GetInventoryCountUseCase
  implements UseCase<Props, InventoryCountUi>
{
  constructor(
    private readonly mapper: InventoryCountMapper,

    @Inject(InventoryCountRepositoryPort)
    private readonly inventoryCountRepository: InventoryCountRepositoryPort,

    @Inject(InventoryCountTemplateRepositoryPort)
    private readonly inventoryCountTemplateRepository: InventoryCountTemplateRepositoryPort,
  ) {}

  async execute(props: Props): Promise<InventoryCountUi> {
    const inventoryCount = await this.inventoryCountRepository.findById(
      props.inventoryCountId,
    );

    if (!inventoryCount) {
      throw new InventoryCountNotFoundError();
    }

    const inventoryCountTemplate =
      await this.inventoryCountTemplateRepository.findById(
        inventoryCount.getProps().inventoryCountTemplateId,
      );

    if (!inventoryCountTemplate) {
      throw new InventoryCountTemplateNotFoundError();
    }

    return this.mapper.toUi(inventoryCount, inventoryCountTemplate);
  }
}
