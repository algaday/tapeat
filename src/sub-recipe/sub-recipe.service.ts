import { Injectable } from '@nestjs/common';
import { CreateSubRecipeBodyDto } from './dto';
import { SubRecipeRepository } from './sub-recipe.repository';

@Injectable()
export class SubRecipeService {
  constructor(private readonly subRecipeRepository: SubRecipeRepository) {}

  async create(data: CreateSubRecipeBodyDto) {
    return this.subRecipeRepository.create(data);
  }

  async findById(id: string) {
    return this.subRecipeRepository.findById(id);
  }

  async findAll() {
    return this.subRecipeRepository.findAll();
  }

  async delete(id: string) {
    return this.subRecipeRepository.delete(id);
  }

  async update(id: string, data: Partial<CreateSubRecipeBodyDto>) {
    return this.subRecipeRepository.update(id, data);
  }
}
