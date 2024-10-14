import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { CreateRecipeUseCase } from '../application/use-cases/create-recipe/create-recipe.use-case';
import { UpdateRecipeUseCase } from '../application/use-cases/update-recipe/update-recipe.use-case';
import { GetRecipeUseCase } from '../application/use-cases/get-recipe/get-recipe.use-case';
import { DeleteRecipeUseCase } from '../application/use-cases/delete-recipe/delete-recipe.use-case';
import { AddRecipeItemDto } from './dto/add-recipe-item.dto';
import { AddRecipeIngredientsUseCase } from '../application/use-cases/add-recipe-ingredients/add-recipe-ingredient.use-case';

@Controller('recipes')
export class RecipeController {
  constructor(
    private readonly createRecipe: CreateRecipeUseCase,
    private readonly updateRecipe: UpdateRecipeUseCase,
    private readonly getRecipe: GetRecipeUseCase,
    private readonly deleteRecipe: DeleteRecipeUseCase,
    private readonly addRecipeIngredient: AddRecipeIngredientsUseCase,
  ) {}
  @Post()
  async create(@Body() dto: CreateRecipeDto) {
    return this.createRecipe.execute(dto);
  }

  @Get(':id')
  async getById(@Param('id') recipeId: string) {
    return this.getRecipe.execute({ recipeId });
  }

  @Delete(':id')
  async delete(@Param('id') recipeId: string) {
    return this.deleteRecipe.execute({ recipeId });
  }

  @Put(':id')
  async update(@Param() id: string, @Body() dto: UpdateRecipeDto) {
    return this.updateRecipe.execute({ recipeId: id, ...dto });
  }

  @Post('ingredient')
  async addIngredient(@Body() dto: AddRecipeItemDto) {
    return this.addRecipeIngredient.execute(dto);
  }
}
