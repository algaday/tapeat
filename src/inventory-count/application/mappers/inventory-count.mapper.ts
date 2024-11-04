import { Injectable } from '@nestjs/common';
import { InventoryCountItem as InventoryCountItemDbRecord } from '@prisma/client';
import _ from 'lodash';
import { InventoryCountItemEntity } from 'src/inventory-count/domain/inventory-count-item.entity';
import {
  InventoryCountEntity,
  InventoryCountItemType,
  InventoryCountStatus,
} from 'src/inventory-count/domain/inventory-count.entity';
import { InventoryCountDbRecord } from 'src/inventory-count/infra/repository/prisma.inventory-count.adapter';
import {
  InventoryCountItemDto,
  InventoryCountStoragesDto,
  InventoryCountWithStorageDto,
} from 'src/inventory-count/presentation/dto/inventory-count.dto';

@Injectable()
export class InventoryCountMapper {
  toDomain(record: InventoryCountDbRecord): InventoryCountEntity {
    return new InventoryCountEntity({
      id: record.id,
      props: {
        staffName: record.staffName,
        inventoryCountTemplateId: record.inventoryCountTemplateId,
        inventoryCountItems: record.inventoryCountItems.map((item) =>
          this.toInventoryCountItemDomain(item),
        ),
        status: record.status as InventoryCountStatus,
      },
    });
  }

  toUi(entity: InventoryCountEntity): InventoryCountWithStorageDto {
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
        this.toInventoryCountItemUi(item),
      ),
    }));

    return {
      id: props.id,
      staffName: props.staffName,
      storages,
    };
  }

  toInventoryCountItemUi(
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

  toInventoryCountItemDomain(
    record: InventoryCountItemDbRecord,
  ): InventoryCountItemEntity {
    return new InventoryCountItemEntity({
      id: record.id,
      props: {
        itemId: record.ingredientId || record.recipeId,
        quantity: Number(record.quantity),
        type: record.ingredientId
          ? InventoryCountItemType.INGREDIENT
          : InventoryCountItemType.RECIPE,
        storageName: record.storageName,
      },
    });
  }
}
