import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateStorageBodyDto } from './dto';
import { StorageService } from './storage.service';

@Controller('storages')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @Post()
  async create(@Body() data: CreateStorageBodyDto) {
    return this.storageService.create(data);
  }

  @Post('bulk')
  async createMany(@Body() data: CreateStorageBodyDto[]) {
    return this.storageService.createMany(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.storageService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CreateStorageBodyDto) {
    return this.storageService.update(id, data);
  }

  @Get()
  async getAll() {
    return this.storageService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.storageService.findById(id);
  }

  @Post(':storageId/ingredients')
  async assignIngredient(
    @Param('storageId') storageId: string,
    @Body('ingredientId') ingredientId: string,
  ) {
    return this.storageService.assignIngredient(storageId, ingredientId);
  }

  @Delete(':storageId/ingredients/:ingredientId')
  async unassignIngredient(
    @Param('storageId') storageId: string,
    @Param('ingredientId') ingredientId: string,
  ) {
    return this.storageService.unassignIngredient(storageId, ingredientId);
  }

  @Post(':storageId/recipes')
  async assignRecipe(
    @Param('storageId') storageId: string,
    @Body('recipeId') recipeId: string,
  ) {
    return this.storageService.assignRecipe(storageId, recipeId);
  }

  @Delete(':storageId/recipes/:recipeId')
  async unassignRecipe(
    @Param('storageId') storageId: string,
    @Param('recipeId') recipeId: string,
  ) {
    return this.storageService.unassignRecipe(storageId, recipeId);
  }
}
