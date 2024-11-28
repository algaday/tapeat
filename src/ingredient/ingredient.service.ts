import { Injectable } from '@nestjs/common';
import { CreateIngredientBodyDto } from './dto';
import { IngredientRepository } from './ingredient.repository';

@Injectable()
export class IngredientService {
  constructor(private readonly ingredientRepository: IngredientRepository) {}

  async create(data: CreateIngredientBodyDto) {
    return this.ingredientRepository.create(data);
  }

  async createMany(data: CreateIngredientBodyDto[]) {
    return this.ingredientRepository.createMany(data);
  }

  async findById(id: string) {
    return this.ingredientRepository.findById(id);
  }

  async findAll() {
    return this.ingredientRepository.findAll();
  }

  async delete(id: string) {
    return this.ingredientRepository.delete(id);
  }

  async update(id: string, data: CreateIngredientBodyDto) {
    return this.ingredientRepository.update(id, data);
  }
}
