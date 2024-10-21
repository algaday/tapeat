import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateInventoryCountDto } from './dto/create-inventory-count.dto';
import { CreateInventoryCountUseCase } from '../application/use-cases/create-inventory-count/create-inventory-count.use-case';
import { InventoryCountDto } from './dto/inventory-count.dto';
import { UpdateInventoryCountUseCase } from '../application/use-cases/update-inventory-count/update-inventory-count.use-case';
import { UpdateInventoryCountDto } from './dto/update-inventory-count.dto';
import { GetInventoryCountUseCase } from '../application/use-cases/get-inventory-count/get-inventory-count.use-case';

@Controller('inventory-counts')
export class InventoryCountController {
  constructor(
    private readonly createInventoryCount: CreateInventoryCountUseCase,
    private readonly updateInventoryCount: UpdateInventoryCountUseCase,
    private readonly getInventoryCount: GetInventoryCountUseCase,
  ) {}
  @Post()
  async create(
    @Body() dto: CreateInventoryCountDto,
  ): Promise<InventoryCountDto> {
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

  @Get(':inventoryCountId')
  public async get(@Param('inventoryCountId') inventoryCountId: string) {
    return this.getInventoryCount.execute({ inventoryCountId });
  }
}
