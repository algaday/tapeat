import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/use-case.interface';
import { InventoryCountTemplateRepositoryPort } from 'src/inventory-count-template/domain/inventory-count-template-repository.port';
import {
  InventoryCountTemplateEntity,
  InventoryCountTemplateType,
} from 'src/inventory-count-template/domain/inventory-count-template.entity';
import { InventoryCountTemplateDto as InventoryCountTemplateUi } from 'src/inventory-count-template/presentation/dto/inventory-count-template.dto';
import { InventoryCountTemplateMapper } from '../../mappers/inventory-count-template.mapper';

interface Props {
  templateType: InventoryCountTemplateType;
  branchId: string;
  name: string;
}

@Injectable()
export class CreateInventoryCountTemplateUseCase
  implements UseCase<Props, InventoryCountTemplateUi>
{
  constructor(
    private readonly mapper: InventoryCountTemplateMapper,

    @Inject(InventoryCountTemplateRepositoryPort)
    private readonly inventoryCountTemplateRepository: InventoryCountTemplateRepositoryPort,
  ) {}

  async execute(props: Props): Promise<InventoryCountTemplateUi> {
    const inventoryCountTemplate = InventoryCountTemplateEntity.create({
      ...props,
      storages: [],
    });

    await this.inventoryCountTemplateRepository.create(inventoryCountTemplate);

    return this.mapper.toUi(inventoryCountTemplate);
  }
}
