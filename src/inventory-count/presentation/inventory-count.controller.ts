import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateInventoryCountUseCase } from '../application/use-cases/create-inventory-count/create-inventory-count.use-case';
import { GetInventoryCountUseCase } from '../application/use-cases/get-inventory-count/get-inventory-count.use-case';
import { GetInventoryCountsUseCase } from '../application/use-cases/get-inventory-counts/get-inventory-counts.use-case';
import { UpdateInventoryCountItemUseCase } from '../application/use-cases/update-inventory-count-item/update-inventory-count-item.use-case';
import { UpdateInventoryCountUseCase } from '../application/use-cases/update-inventory-count/update-inventory-count.use-case';
import { InventoryCountStatus } from '../domain/inventory-count.entity';
import { CreateInventoryCountDto } from './dto/create-inventory-count.dto';
import { InventoryCountExtendedDto } from './dto/inventory-count.dto';
import {
  SubmitInventoryCountDto,
  UpdateInventoryCountDto,
  UpdateInventoryCountItemDto,
} from './dto/update-inventory-count.dto';
import { SubmitInventoryCountUseCase } from '../application/use-cases/submit-inventory-count/submit-inventory-count.use-case';

@Controller('inventory-counts')
export class InventoryCountController {
  constructor(
    private readonly createInventoryCount: CreateInventoryCountUseCase,
    private readonly updateInventoryCount: UpdateInventoryCountUseCase,
    private readonly getInventoryCount: GetInventoryCountUseCase,
    private readonly getInventoryCounts: GetInventoryCountsUseCase,
    private readonly updateInventoryCountItem: UpdateInventoryCountItemUseCase,
    private readonly submitInventoryCount: SubmitInventoryCountUseCase,
  ) {}

  @Get(':inventoryCountId')
  public async get(@Param('inventoryCountId') inventoryCountId: string) {
    return this.getInventoryCount.execute({ inventoryCountId });
  }

  @Get()
  public async getAll(
    @Query('ids') ids: string,
    @Query('status') status: InventoryCountStatus,
  ) {
    const inventoryCountIds = ids.split(',');
    return this.getInventoryCounts.execute({ inventoryCountIds, status });
  }

  @Post()
  async create(
    @Body() dto: CreateInventoryCountDto,
  ): Promise<InventoryCountExtendedDto> {
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

  @Put(':inventoryCountId/submit')
  public async submit(
    @Body() dto: SubmitInventoryCountDto,
    @Param('inventoryCountId') inventoryCountId: string,
  ) {
    return this.submitInventoryCount.execute({
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
}
