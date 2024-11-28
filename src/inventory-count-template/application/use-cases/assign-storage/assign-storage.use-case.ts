import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/use-case.interface';
import { InventoryCountTemplateRepositoryPort } from 'src/inventory-count-template/domain/inventory-count-template-repository.port';

interface Props {
  storageId: string;
  inventoryCountTemplateId: string;
}

@Injectable()
export class AssignStorageUseCase implements UseCase<Props, void> {
  constructor(
    @Inject(InventoryCountTemplateRepositoryPort)
    private readonly inventoryCountTemplateRepository: InventoryCountTemplateRepositoryPort,
  ) {}

  async execute({ inventoryCountTemplateId, storageId }: Props): Promise<void> {
    await this.inventoryCountTemplateRepository.assignStorage(
      inventoryCountTemplateId,
      storageId,
    );
  }
}
