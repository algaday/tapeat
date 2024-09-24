import { Injectable } from '@nestjs/common';
import { CreateSubRecipeBodyDto } from './dto';
import { SubRecipeRepository } from './sub-recipe.repository';

@Injectable()
export class SubRecipeService {
  constructor(private readonly subRecipeRepository: SubRecipeRepository) {}

  async createSubRecipe(data: CreateSubRecipeBodyDto) {
    return this.subRecipeRepository.create(data);
  }

  async getSubRecipe(id: string) {
    return this.subRecipeRepository.findById(id);
  }

  async getSubRecipes() {
    return this.subRecipeRepository.findAll();
  }

  async deleteSubRecipe(id: string) {
    return this.subRecipeRepository.delete(id);
  }

  async updateSubRecipe(id: string, data: Partial<CreateSubRecipeBodyDto>) {
    return this.subRecipeRepository.update(id, data);
  }
}
