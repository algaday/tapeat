import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIngredientBodyDto } from './dto';

@Injectable()
export class IngredientRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateIngredientBodyDto) {
    return this.prismaService.ingredient.create({ data });
  }
  async createMany(data: CreateIngredientBodyDto[]) {
    return this.prismaService.ingredient.createMany({ data });
  }

  async findById(id: string) {
    return this.prismaService.ingredient.findFirst({ where: { id } });
  }

  async findAll() {
    return this.prismaService.ingredient.findMany();
  }

  async update(id: string, data: CreateIngredientBodyDto) {
    return this.prismaService.ingredient.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prismaService.ingredient.delete({ where: { id } });
  }
}
