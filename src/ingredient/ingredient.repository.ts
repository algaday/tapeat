import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IngredientDto } from './dto';

@Injectable()
export class IngredientRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: IngredientDto) {
    return this.prismaService.ingredient.create({ data: dto });
  }

  async findById(id: string) {
    return this.prismaService.ingredient.findFirst({ where: { id } });
  }

  async findAll(ids?: string[]) {
    if (ids) {
      return this.prismaService.ingredient.findMany({
        where: { id: { in: ids } },
      });
    }
    return this.prismaService.ingredient.findMany();
  }

  async update(id: string, dto: IngredientDto) {
    return this.prismaService.ingredient.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    return this.prismaService.ingredient.delete({ where: { id } });
  }
}
