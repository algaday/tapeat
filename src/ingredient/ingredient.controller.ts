import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientDto } from './dto';

@Controller('ingredients')
export class IngredientController {
  constructor(private ingredientService: IngredientService) {}
  @Post()
  async createIngredient(@Body() dto: IngredientDto) {
    return this.ingredientService.createIngredient(dto);
  }

  @Delete(':id')
  async deleteIngredient(@Param('id') id: string) {
    return this.ingredientService.deleteIngredient(id);
  }

  @Put(':id')
  async updateIngredient(@Param() id: string, @Body() dto: IngredientDto) {
    return this.ingredientService.updateIngredient(id, dto);
  }

  @Get()
  async getIngredients(@Query('ids') ids?: string) {
    if (ids) {
      const idsArray = ids.split(',');
      return this.ingredientService.getIngredients(idsArray);
    } else {
      return this.ingredientService.getIngredients();
    }
  }

  @Get(':id')
  async getIngredient(@Param('id') id: string) {
    return this.ingredientService.getIngredient(id);
  }
}
