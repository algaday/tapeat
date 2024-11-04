import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateInventoryCountUseCase } from '../application/use-cases/create-inventory-count/create-inventory-count.use-case';
import { GetInventoryCountUseCase } from '../application/use-cases/get-inventory-count/get-inventory-count.use-case';
import { GetInventoryCountsUseCase } from '../application/use-cases/get-inventory-counts/get-inventory-counts.use-case';
import { UpdateInventoryCountItemUseCase } from '../application/use-cases/update-inventory-count-item/update-inventory-count-item.use-case';
import { UpdateInventoryCountUseCase } from '../application/use-cases/update-inventory-count/update-inventory-count.use-case';
import { CreateInventoryCountDto } from './dto/create-inventory-count.dto';
import { GetInventoryCountDto } from './dto/get-inventory-counts.dto';
import { InventoryCountWithStorageDto } from './dto/inventory-count.dto';
import {
  UpdateInventoryCountDto,
  UpdateInventoryCountItemDto,
} from './dto/update-inventory-count.dto';

@Controller('inventory-counts')
export class InventoryCountController {
  constructor(
    private readonly createInventoryCount: CreateInventoryCountUseCase,
    private readonly updateInventoryCount: UpdateInventoryCountUseCase,
    private readonly getInventoryCount: GetInventoryCountUseCase,
    private readonly getInventoryCounts: GetInventoryCountsUseCase,
    private readonly updateInventoryCountItem: UpdateInventoryCountItemUseCase,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateInventoryCountDto,
  ): Promise<InventoryCountWithStorageDto> {
    return this.createInventoryCount.execute(dto);
  }

  @Put(':inventoryCountId')
  public async update(
    @Body() dto: UpdateInventoryCountDto,
    @Param('inventoryCountId') inventoryCountId: string,
  ) {
    return this.updateInventoryCount.execute({
      ...dto,
      inventoryCountId,
    });
  }

  @Put(':inventoryCountId/items/:itemId')
  public async updateItem(
    @Body() { quantity }: UpdateInventoryCountItemDto,
    @Param('inventoryCountId') inventoryCountId: string,
    @Param('itemId') itemId: string,
  ) {
    return this.updateInventoryCountItem.execute({
      id: itemId,
      inventoryCountId,
      quantity,
    });
  }

  @Get(':inventoryCountId')
  public async get(@Param('inventoryCountId') inventoryCountId: string) {
    return this.getInventoryCount.execute({ inventoryCountId });
  }

  @Get('')
  public async getAll(@Body() { ids }: GetInventoryCountDto) {
    return this.getInventoryCounts.execute({ inventoryCountIds: ids });
  }
}
