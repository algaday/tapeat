import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStorageBodyDto } from './dto';

@Injectable()
export class StorageRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateStorageBodyDto) {
    return this.prismaService.storage.create({ data });
  }

  async createMany(data: CreateStorageBodyDto[]) {
    return this.prismaService.storage.createMany({ data });
  }

  async findById(id: string) {
    return this.prismaService.storage.findFirst({ where: { id } });
  }

  async findAll() {
    return this.prismaService.storage.findMany();
  }

  async update(id: string, data: CreateStorageBodyDto) {
    return this.prismaService.storage.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prismaService.storage.delete({ where: { id } });
  }

  async assignIngredient(storageId: string, ingredientId: string) {
    return this.prismaService.storageItem.create({
      data: { storageId, ingredientId },
    });
  }

  async assignRecipe(storageId: string, recipeId: string) {
    return this.prismaService.storageItem.create({
      data: { storageId, recipeId },
    });
  }

  async unassignIngredient(storageId: string, ingredientId) {
    return this.prismaService.storageItem.delete({
      where: { storageId_ingredientId: { storageId, ingredientId } },
    });
  }

  async unassignRecipe(storageId: string, recipeId: string) {
    return this.prismaService.storageItem.delete({
      where: {
        storageId_recipeId: { storageId, recipeId },
      },
    });
  }
}
