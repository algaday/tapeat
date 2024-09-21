import { Injectable } from '@nestjs/common';
import { CreateIngredientBody } from './dto';
import { IngredientRepository } from './ingredient.repository';

@Injectable()
export class IngredientService {
  constructor(private readonly ingredientRepository: IngredientRepository) {}

  async createIngredient(data: CreateIngredientBody) {
    return this.ingredientRepository.createOne(data);
  }

  async createIngredients(data: CreateIngredientBody[]) {
    return this.ingredientRepository.createMany(data);
  }

  async getIngredient(id: string) {
    return this.ingredientRepository.findById(id);
  }

  async getIngredients() {
    return this.ingredientRepository.findAll();
  }

  async deleteIngredient(id: string) {
    return this.ingredientRepository.delete(id);
  }

  async updateIngredient(id: string, data: CreateIngredientBody) {
    return this.ingredientRepository.update(id, data);
  }
}
