import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/use-case.interface';
import { InventoryCountRepositoryPort } from 'src/inventory-count/domain/inventory-count-repository.port';
import { InventoryCountNotFoundError } from 'src/inventory-count/errors/inventory-count-not-found.error';
import { InventoryCountExtendedDto as InventoryCountUi } from 'src/inventory-count/presentation/dto/inventory-count.dto';
import { InventoryCountMapper } from '../../mappers/inventory-count.mapper';
import { InventoryCountStatus } from 'src/inventory-count/domain/inventory-count.entity';
import { NotificationApplicationService } from 'src/notification/application/services/notification.application-service';

interface Props {
  inventoryCountId: string;
}

@Injectable()
export class SubmitInventoryCountUseCase
  implements UseCase<Props, InventoryCountUi>
{
  constructor(
    private readonly mapper: InventoryCountMapper,
    @Inject(InventoryCountRepositoryPort)
    private readonly inventoryCountRepository: InventoryCountRepositoryPort,
    private readonly notificationApplicationService: NotificationApplicationService,
  ) {}

  async execute(props: Props): Promise<InventoryCountUi> {
    const inventoryCount = await this.inventoryCountRepository.findById(
      props.inventoryCountId,
    );

    if (!inventoryCount) {
      throw new InventoryCountNotFoundError();
    }

    inventoryCount.update({
      status: InventoryCountStatus.AWAITING_APPROVAL,
    });

    await this.inventoryCountRepository.update(inventoryCount);

    await this.notificationApplicationService.notifyInventoryCountByTelegram({
      inventoryCount,
    });

    return this.mapper.toUi(inventoryCount);
  }
}
