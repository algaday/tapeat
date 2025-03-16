import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/use-case.interface';
import { InventoryCountTemplateRepositoryPort } from 'src/inventory-count-template/domain/inventory-count-template-repository.port';
import { InventoryCountTemplateDto as InventoryCountTemplateUi } from 'src/inventory-count-template/presentation/dto/inventory-count-template.dto';
import { InventoryCountTemplateMapper } from '../../mappers/inventory-count-template.mapper';

interface Props {
  branchId: string;
}

@Injectable()
export class GetBranchInventoryCountTemplatesUseCase
  implements UseCase<Props, InventoryCountTemplateUi[]>
{
  constructor(
    private readonly mapper: InventoryCountTemplateMapper,

    @Inject(InventoryCountTemplateRepositoryPort)
    private readonly inventoryCountTemplateRepository: InventoryCountTemplateRepositoryPort,
  ) {}

  async execute(props: Props): Promise<InventoryCountTemplateUi[]> {
    const templates =
      await this.inventoryCountTemplateRepository.findBranchInventoryCountTemplates(
        props.branchId,
      );
    return templates.map((template) => this.mapper.toUi(template));
  }
}
