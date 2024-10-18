import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AssignStorageUseCase } from '../application/use-cases';
import { CreateInventoryCountTemplateDto } from './dto/create-inventory-count-template.dto';
import { CreateInventoryCountTemplateUseCase } from '../application/use-cases/create-inventory-count-template/create-inventory-count-template.use-case';
import { GetInventoryCountTemplateUseCase } from '../application/use-cases/get-inventory-count-template/get-inventory-count-template.use-case';

@Controller('inventory-count-templates')
export class InventoryCountTemplateController {
  constructor(
    private readonly createInventoryCountTemplate: CreateInventoryCountTemplateUseCase,
    private readonly getInventoryCountTemplate: GetInventoryCountTemplateUseCase,
    private readonly assignStorage: AssignStorageUseCase,
  ) {}
  @Post()
  async create(@Body() dto: CreateInventoryCountTemplateDto) {
    return this.createInventoryCountTemplate.execute(dto);
  }

  @Get(':inventoryCountTemplateId')
  async getById(
    @Param('inventoryCountTemplateId') inventoryCountTemplateId: string,
  ) {
    return this.getInventoryCountTemplate.execute({ inventoryCountTemplateId });
  }
  @Post(':inventoryCountTemplateId/storages/:storageId')
  async addIngredient(
    @Param('inventoryCountTemplateId') inventoryCountTemplateId: string,
    @Param('storageId') storageId: string,
  ) {
    return this.assignStorage.execute({ inventoryCountTemplateId, storageId });
  }
}
