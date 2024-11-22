import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import slugify from 'slugify';
import { Unit } from 'src/constants/enums/unit.enum';
import { InventoryCountTemplateEntity } from 'src/inventory-count-template/domain/inventory-count-template.entity';
import { InventoryCountItemEntity } from 'src/inventory-count/domain/inventory-count-item.entity';
import {
  InventoryCountEntity,
  InventoryCountItemType,
  InventoryCountStatus,
} from 'src/inventory-count/domain/inventory-count.entity';
import {
  InventoryCountDbRecord,
  InventoryCountItemDbRecord,
} from 'src/inventory-count/infra/repository/prisma.inventory-count.adapter';
import {
  InventoryCountExtendedDto,
  InventoryCountItemDto,
  InventoryCountStorageDto,
} from 'src/inventory-count/presentation/dto/inventory-count.dto';
import {
  InventoryCountBaseDto,
  StorageDto,
} from 'src/inventory-count/presentation/dto/inventory-counts.dto';
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
        branchName: record.branchName,
      },
      createdAt: record.createdAt,
    });
  }

  toUi(
    entity: InventoryCountEntity,
    inventoryCountTemplate?: InventoryCountTemplateEntity, //todo: refactor
  ): InventoryCountExtendedDto {
    const props = entity.getProps();

    const groupedByStorage = _.groupBy(
      props.inventoryCountItems,
      (item) => item.getProps().storageName,
    );

    const storages: InventoryCountStorageDto[] = Object.entries(
      groupedByStorage,
    ).map(([name, items]) => ({
      name,
      slug: slugify(name, { lower: true }),
      items: items.map((item) => this.toInventoryCountItemUi(item)),
    }));

    return {
      id: props.id,
      staffName: props.staffName,
      storages,
      branchName: props.branchName,
      status: props.status,
      createdAt: props.createdAt.toISOString(),
      templateName:
        inventoryCountTemplate?.getProps()?.name || 'unknown template',
    };
  }

  toBaseUi(params: {
    entity: InventoryCountEntity;
    inventoryCountTemplate?: InventoryCountTemplateEntity;
  }): InventoryCountBaseDto {
    const { entity, inventoryCountTemplate } = params;
    const props = entity.getProps();

    const groupedByStorage = _.groupBy(
      props.inventoryCountItems,
      (item) => item.getProps().storageName,
    );

    const storages: StorageDto[] = Object.entries(groupedByStorage).map(
      ([storageName]) => ({
        name: storageName,
        slug: slugify(storageName, { lower: true }),
      }),
    );

    return {
      id: props.id,
      staffName: props.staffName,
      storages,
      branchName: props.branchName,
      status: props.status,
      createdAt: props.createdAt.toISOString(),
      templateName:
        inventoryCountTemplate?.getProps()?.name || 'unknown template',
    };
  }

  toInventoryCountItemUi(
    entity: InventoryCountItemEntity,
  ): InventoryCountItemDto {
    const props = entity.getProps();

    return {
      id: entity.getId(),
      quantity: props.quantity,
      type: props.type,
      storageName: props.storageName,
      name: props.name,
      unit: props.unit,
    };
  }

  toInventoryCountItemDomain(
    record: InventoryCountItemDbRecord,
  ): InventoryCountItemEntity {
    return new InventoryCountItemEntity({
      id: record.id,
      props: {
        itemId: record.ingredientId || record.recipeId,
        quantity: record.quantity?.toNumber(),
        type: record.ingredientId
          ? InventoryCountItemType.INGREDIENT
          : InventoryCountItemType.RECIPE,
        storageName: record.storageName,
        name: record.ingredientId ? record.ingredient.name : record.recipe.name,
        unit: record.ingredientId
          ? (record.ingredient.unit as Unit)
          : (record.recipe.unit as Unit),
      },
    });
  }
}
