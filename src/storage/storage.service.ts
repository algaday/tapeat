import { Injectable } from '@nestjs/common';
import { CreateStorageBodyDto } from './dto';
import { StorageRepository } from './storage.repository';

@Injectable()
export class StorageService {
  constructor(private readonly storageRepository: StorageRepository) {}

  async create(data: CreateStorageBodyDto) {
    return this.storageRepository.create(data);
  }

  async createMany(data: CreateStorageBodyDto[]) {
    return this.storageRepository.createMany(data);
  }

  async findById(id: string) {
    return this.storageRepository.findById(id);
  }

  async findAll() {
    return this.storageRepository.findAll();
  }

  async delete(id: string) {
    return this.storageRepository.delete(id);
  }

  async update(id: string, data: CreateStorageBodyDto) {
    return this.storageRepository.update(id, data);
  }

  async assignIngredient(storageId: string, ingredientId: string) {
    return this.storageRepository.assignIngredient(storageId, ingredientId);
  }

  async unassignIngredient(storageId: string, ingredientId: string) {
    return this.storageRepository.unassignIngredient(storageId, ingredientId);
  }

  async assignRecipe(storageId: string, recipeId: string) {
    return this.storageRepository.assignRecipe(storageId, recipeId);
  }

  async unassignRecipe(storageId: string, recipeId: string) {
    return this.storageRepository.unassignRecipe(storageId, recipeId);
  }
}
