import { Body, Controller, Post } from '@nestjs/common';
import { CreateInventoryCountDto } from './dto/create-inventory-count.dto';
import { CreateInventoryCountUseCase } from '../application/use-cases/create-inventory-count/create-inventory-count.use-case';
import { InventoryCountDto } from './dto/inventory-count.dto';

@Controller('inventory-counts')
export class InventoryCountController {
  constructor(
    private readonly createInventoryCount: CreateInventoryCountUseCase,
  ) {}
  @Post()
  async create(
    @Body() dto: CreateInventoryCountDto,
  ): Promise<InventoryCountDto> {
    return this.createInventoryCount.execute(dto);
  }
}
