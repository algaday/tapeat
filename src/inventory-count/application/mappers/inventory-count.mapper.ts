import { Injectable } from '@nestjs/common';
import { InventoryCountItemEntity } from 'src/inventory-count/domain/inventory-count-item.entity';
import { InventoryCountEntity } from 'src/inventory-count/domain/inventory-count.entity';
import { InventoryCountDbRecord } from 'src/inventory-count/infra/repository/prisma.inventory-count.adapter';
import {
  InventoryCountDto,
  InventoryCountItemDto,
} from 'src/inventory-count/presentation/dto/inventory-count.dto';
import { RecipeItemType } from 'src/recipe/domain/recipe-item.entity';

@Injectable()
export class InventoryCountMapper {
  toDomain(record: InventoryCountDbRecord): InventoryCountEntity {
    return new InventoryCountEntity({
      id: record.id,
      props: {
        staffName: record.staffName,
        inventoryCountTemplateId: record.inventoryCountTemplateId,
        inventoryCountItems: record.inventoryCountItems.map(
          (item) =>
            new InventoryCountItemEntity({
              id: item.id,
              props: {
                itemId: item.ingredientId || item.recipeId,
                quantity: item.quantity,
                type: item.ingredientId
                  ? RecipeItemType.INGREDIENT
                  : RecipeItemType.SUB_RECIPE,
              },
            }),
        ),
      },
    });
  }

  private mapInventoryCountItemUi(
    entity: InventoryCountItemEntity,
  ): InventoryCountItemDto {
    const props = entity.getProps();

    return {
      id: props.itemId,
      quantity: props.quantity,
      type: props.type,
    };
  }

  toUi(entity: InventoryCountEntity): InventoryCountDto {
    const props = entity.getProps();
    return {
      id: props.id,
      staffName: props.staffName,
      inventoryCountItems: props.inventoryCountItems?.map((item) =>
        this.mapInventoryCountItemUi(item),
      ),
    };
  }
}
