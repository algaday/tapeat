import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/use-case.interface';
import { InventoryCountRepositoryPort } from 'src/inventory-count/domain/inventory-count-repository.port';
import { InventoryCountNotFoundError } from 'src/inventory-count/errors/inventory-count-not-found.error';
import { InventoryCountExtendedDto as InventoryCountUi } from 'src/inventory-count/presentation/dto/inventory-count.dto';
import { InventoryCountMapper } from '../../mappers/inventory-count.mapper';
import { IngredientRepository } from 'src/ingredient/ingredient.repository';
import { InventoryCountStatus } from 'src/inventory-count/domain/inventory-count.entity';

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

    private readonly ingredientRepository: IngredientRepository,
  ) {}

  async execute(props: Props): Promise<InventoryCountUi> {
    const inventoryCount = await this.inventoryCountRepository.findById(
      props.inventoryCountId,
    );

    if (!inventoryCount) {
      throw new InventoryCountNotFoundError();
    }

    const inventoryCountItems = inventoryCount.getProps().inventoryCountItems;

    const ingredients = await this.ingredientRepository.findByIds(
      inventoryCountItems.map((item) => item.getProps().itemId),
    );

    const ingredientThresholds = new Map(
      ingredients.map((ingredient) => [
        ingredient.id,
        ingredient.minQuantityThreshold,
      ]),
    );

    const itemsUnderThreshold = inventoryCountItems.filter((item) => {
      const threshold = ingredientThresholds.get(item.getProps().itemId);
      return (
        new Number(item.getProps().quantity) <
        (new Number(threshold) ?? Infinity)
      );
    });

    console.log(itemsUnderThreshold);

    inventoryCount.update({
      status: InventoryCountStatus.AWAITING_APPROVAL,
    });

    await this.inventoryCountRepository.update(inventoryCount);

    return this.mapper.toUi(inventoryCount);
  }
}
