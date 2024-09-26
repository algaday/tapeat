import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRecipeBodyDto } from './dto';
import { RecipeService } from './recipe.service';
import { SubRecipeService } from 'src/sub-recipe/sub-recipe.service';

@Controller('recipes')
export class RecipeController {
  constructor(
    private recipeService: RecipeService,
    private subRecipeService: SubRecipeService,
  ) {}
  @Post()
  async create(@Body() data: CreateRecipeBodyDto) {
    return this.recipeService.create(data);
  }

  @Post('bulk')
  async createMany(@Body() data: CreateRecipeBodyDto[]) {
    return this.recipeService.createMany(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.recipeService.delete(id);
  }

  @Put(':id')
  async update(@Param() id: string, @Body() data: CreateRecipeBodyDto) {
    return this.recipeService.update(id, data);
  }

  @Get()
  async getAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.recipeService.findById(id);
  }

  @Get(':recipeId/detailed')
  async getRecipeIngredientsWithSubs(@Param('recipeId') recipeId: string) {
    return this.subRecipeService.getRecipeIngredientsWithSubs(recipeId);
  }
}
