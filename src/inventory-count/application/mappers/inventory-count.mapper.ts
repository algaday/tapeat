import { Injectable } from '@nestjs/common';
import { InventoryCountItemEntity } from 'src/inventory-count/domain/inventory-count-item.entity';
import {
  InventoryCountEntity,
  InventoryCountItemType,
} from 'src/inventory-count/domain/inventory-count.entity';
import { InventoryCountDbRecord } from 'src/inventory-count/infra/repository/prisma.inventory-count.adapter';
import {
  InventoryCountDto,
  InventoryCountItemDto,
  InventoryCountStoragesDto,
} from 'src/inventory-count/presentation/dto/inventory-count.dto';
import _ from 'lodash';

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
                  ? InventoryCountItemType.INGREDIENT
                  : InventoryCountItemType.RECIPE,
                storageName: item.storageName,
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
      storageName: props.storageName,
    };
  }

  toUi(entity: InventoryCountEntity): InventoryCountDto {
    const props = entity.getProps();

    const groupedByStorage = _.groupBy(
      props.inventoryCountItems,
      (item) => item.getProps().storageName,
    );

    const storages: InventoryCountStoragesDto[] = Object.entries(
      groupedByStorage,
    ).map(([storageName, items]) => ({
      storageName,
      inventoryCountItems: items.map((item) =>
        this.mapInventoryCountItemUi(item),
      ),
    }));

    return {
      id: props.id,
      staffName: props.staffName,
      storages,
    };
  }
}
