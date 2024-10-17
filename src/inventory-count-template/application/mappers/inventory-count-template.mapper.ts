import { Injectable } from '@nestjs/common';
import {
  InventoryCountTemplateEntity,
  InventoryCountTemplateType,
} from 'src/inventory-count-template/domain/inventory-count-template.entity';
import { InventoryCountTemplateDbRecord } from 'src/inventory-count-template/infra/repository/prisma.inventory-count-template.adapter';
import { InventoryCountTemplateDto } from 'src/inventory-count-template/presentation/dto/inventory-count-template.dto';

@Injectable()
export class InventoryCountTemplateMapper {
  toDomain(
    record: InventoryCountTemplateDbRecord,
  ): InventoryCountTemplateEntity {
    return new InventoryCountTemplateEntity({
      id: record.id,
      props: {
        branchId: record.branchId,
        templateType: record.type as InventoryCountTemplateType,
        storageIds: record.inventoryCountTemplateStorages.map(
          (storage) => storage.storageId,
        ),
      },
    });
  }
  toUi(entity: InventoryCountTemplateEntity): InventoryCountTemplateDto {
    const props = entity.getProps();
    return {
      id: props.id,
      templateType: props.templateType,
      storageIds: props.storageIds,
    };
  }
}
