import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIngredientBody } from './dto';

@Injectable()
export class IngredientRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createOne(data: CreateIngredientBody) {
    return this.prismaService.ingredient.create({ data });
  }
  async createMany(data: CreateIngredientBody[]) {
    return this.prismaService.ingredient.createMany({ data });
  }

  async findById(id: string) {
    return this.prismaService.ingredient.findFirst({ where: { id } });
  }

  async findAll() {
    return this.prismaService.ingredient.findMany();
  }

  async update(id: string, data: CreateIngredientBody) {
    return this.prismaService.ingredient.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prismaService.ingredient.delete({ where: { id } });
  }
}
