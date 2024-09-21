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

@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}
  @Post()
  async createRecipe(@Body() data: CreateRecipeBodyDto) {
    return this.recipeService.createRecipe(data);
  }

  @Post('bulk')
  async createRecipes(@Body() data: CreateRecipeBodyDto[]) {
    return this.recipeService.createRecipes(data);
  }

  @Delete(':id')
  async deleteRecipe(@Param('id') id: string) {
    return this.recipeService.deleteRecipe(id);
  }

  @Put(':id')
  async updateRecipe(@Param() id: string, @Body() data: CreateRecipeBodyDto) {
    return this.recipeService.updateRecipe(id, data);
  }

  @Get()
  async getRecipes() {
    return this.recipeService.getRecipes();
  }

  @Get(':id')
  async getRecipe(@Param('id') id: string) {
    return this.recipeService.getRecipe(id);
  }
}
