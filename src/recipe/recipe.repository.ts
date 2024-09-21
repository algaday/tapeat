import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeBodyDto } from './dto';

@Injectable()
export class RecipeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createOne(data: CreateRecipeBodyDto) {
    return this.prismaService.recipe.create({ data });
  }

  async createMany(data: CreateRecipeBodyDto[]) {
    return this.prismaService.recipe.createMany({ data });
  }

  async findById(id: string) {
    return this.prismaService.recipe.findFirst({ where: { id } });
  }

  async findAll(ids?: string[]) {
    if (ids) {
      return this.prismaService.recipe.findMany({
        where: { id: { in: ids } },
      });
    }
    return this.prismaService.recipe.findMany();
  }

  async update(id: string, data: CreateRecipeBodyDto) {
    return this.prismaService.recipe.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prismaService.recipe.delete({ where: { id } });
  }
}
