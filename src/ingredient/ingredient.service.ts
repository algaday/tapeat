import { Injectable } from '@nestjs/common';
import { IngredientDto } from './dto';
import { IngredientRepository } from './ingredient.repository';

@Injectable()
export class IngredientService {
  constructor(private readonly ingredientRepository: IngredientRepository) {}

  async createIngredient(dto: IngredientDto) {
    return this.ingredientRepository.create(dto);
  }

  async getIngredient(id: string) {
    return this.ingredientRepository.findById(id);
  }

  async getIngredients(ids?: string[]) {
    return this.ingredientRepository.findAll(ids);
  }

  async deleteIngredient(id: string) {
    return this.ingredientRepository.delete(id);
  }

  async updateIngredient(id: string, dto: IngredientDto) {
    return this.ingredientRepository.update(id, dto);
  }
}
