import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AssignStorageUseCase } from '../application/use-cases/assign-storage/assign-storage.use-case';
import { CreateInventoryCountTemplateUseCase } from '../application/use-cases/create-inventory-count-template/create-inventory-count-template.use-case';
import { GetBranchInventoryCountTemplatesUseCase } from '../application/use-cases/get-branch-inventory-count-templates/get-branch-inventory-count-templates.use-case';
import { GetInventoryCountTemplateUseCase } from '../application/use-cases/get-inventory-count-template/get-inventory-count-template.use-case';
import { CreateInventoryCountTemplateDto } from './dto/create-inventory-count-template.dto';

@Controller('inventory-count-templates')
export class InventoryCountTemplateController {
  constructor(
    private readonly createInventoryCountTemplate: CreateInventoryCountTemplateUseCase,
    private readonly getInventoryCountTemplate: GetInventoryCountTemplateUseCase,
    private readonly assignStorage: AssignStorageUseCase,
    private readonly getBranchInventoryCountTemplatesUseCase: GetBranchInventoryCountTemplatesUseCase,
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

  @Get('branches/:branchId')
  async getTemplatesByBranch(@Param('branchId') branchId: string) {
    return this.getBranchInventoryCountTemplatesUseCase.execute({ branchId });
  }
}
