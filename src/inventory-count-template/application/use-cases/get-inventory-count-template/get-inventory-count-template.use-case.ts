import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/use-case.interface';
import { InventoryCountTemplateDto as InventoryCountTemplateUi } from 'src/inventory-count-template/presentation/dto/inventory-count-template.dto';
import { InventoryCountTemplateMapper } from '../../mappers/inventory-count-template.mapper';
import { InventoryCountTemplateRepositoryPort } from 'src/inventory-count-template/domain/inventory-count-template-repository.port';

interface Props {
  inventoryCountTemplateId: string;
}

@Injectable()
export class GetInventoryCountTemplateUseCase
  implements UseCase<Props, InventoryCountTemplateUi>
{
  constructor(
    private readonly mapper: InventoryCountTemplateMapper,

    @Inject(InventoryCountTemplateRepositoryPort)
    private readonly inventoryCountTemplateRepository: InventoryCountTemplateRepositoryPort,
  ) {}

  async execute(props: Props): Promise<InventoryCountTemplateUi> {
    const inventoryCountTemplate =
      await this.inventoryCountTemplateRepository.findById(
        props.inventoryCountTemplateId,
      );
    return this.mapper.toUi(inventoryCountTemplate);
  }
}
