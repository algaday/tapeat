import { Injectable } from '@nestjs/common';
import { CreateRecipeBodyDto } from './dto';
import { RecipeRepository } from './recipe.repository';

@Injectable()
export class RecipeService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async create(data: CreateRecipeBodyDto) {
    return this.recipeRepository.create(data);
  }

  async createMany(data: CreateRecipeBodyDto[]) {
    return this.recipeRepository.createMany(data);
  }

  async findById(id: string) {
    return this.recipeRepository.findById(id);
  }

  async findAll() {
    return this.recipeRepository.findAll();
  }

  async delete(id: string) {
    return this.recipeRepository.delete(id);
  }

  async update(id: string, data: CreateRecipeBodyDto) {
    return this.recipeRepository.update(id, data);
  }
}
