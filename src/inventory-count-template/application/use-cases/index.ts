import { AssignStorageUseCase } from './assign-storage/assign-storage.use-case';
import { CreateInventoryCountTemplateUseCase } from './create-inventory-count-template/create-inventory-count-template.use-case';
import { GetInventoryCountTemplateUseCase } from './get-inventory-count-template/get-inventory-count-template.use-case';

export const INVENTORY_COUNT_TEMPLATE_USE_CASES = [
  AssignStorageUseCase,
  CreateInventoryCountTemplateUseCase,
  GetInventoryCountTemplateUseCase,
];
export { AssignStorageUseCase };
