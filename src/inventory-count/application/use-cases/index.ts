import { InventoryCountItemService } from '../services/inventory-count-item.service';
import { CreateInventoryCountUseCase } from './create-inventory-count/create-inventory-count.use-case';
import { GetInventoryCountUseCase } from './get-inventory-count/get-inventory-count.use-case';
import { UpdateInventoryCountUseCase } from './update-inventory-count/update-inventory-count.use-case';

export const INVENTORY_COUNT_USE_CASES = [
  CreateInventoryCountUseCase,
  UpdateInventoryCountUseCase,
  GetInventoryCountUseCase,
];

export const INVENTORY_COUNT_APPLICATION_SERVICES = [InventoryCountItemService];
