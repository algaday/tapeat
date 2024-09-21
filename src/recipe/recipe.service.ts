import { Injectable } from '@nestjs/common';
import { CreateRecipeBodyDto } from './dto';
import { RecipeRepository } from './recipe.repository';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async createRecipe(data: CreateRecipeBodyDto) {
    return this.recipeRepository.createOne(data);
  }

  async createRecipes(data: CreateRecipeBodyDto[]) {
    return this.recipeRepository.createMany(data);
  }

  async getRecipe(id: string) {
    return this.recipeRepository.findById(id);
  }

  async getRecipes() {
    return this.recipeRepository.findAll();
  }

  async deleteRecipe(id: string) {
    return this.recipeRepository.delete(id);
  }

  async updateRecipe(id: string, data: CreateRecipeBodyDto) {
    return this.recipeRepository.update(id, data);
  }
}
