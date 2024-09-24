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
  async createIngredient(@Body() data: CreateIngredientBodyDto) {
    return this.ingredientService.createIngredient(data);
  }

  @Post('bulk')
  async createIngredients(@Body() data: CreateIngredientBodyDto[]) {
    return this.ingredientService.createIngredients(data);
  }

  @Delete(':id')
  async deleteIngredient(@Param('id') id: string) {
    return this.ingredientService.deleteIngredient(id);
  }

  @Put(':id')
  async updateIngredient(
    @Param() id: string,
    @Body() data: CreateIngredientBodyDto,
  ) {
    return this.ingredientService.updateIngredient(id, data);
  }

  @Get()
  async getIngredients() {
    return this.ingredientService.getIngredients();
  }

  @Get(':id')
  async getIngredient(@Param('id') id: string) {
    return this.ingredientService.getIngredient(id);
  }
}
