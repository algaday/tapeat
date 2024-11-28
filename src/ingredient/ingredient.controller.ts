import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientBodyDto } from './dto';

@Controller('ingredients')
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}
  @Post()
  async create(@Body() data: CreateIngredientBodyDto) {
    return this.ingredientService.create(data);
  }

  @Post('bulk')
  async createMany(@Body() data: CreateIngredientBodyDto[]) {
    return this.ingredientService.createMany(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ingredientService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CreateIngredientBodyDto) {
    return this.ingredientService.update(id, data);
  }

  @Get()
  async getAll() {
    return this.ingredientService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.ingredientService.findById(id);
  }
}
