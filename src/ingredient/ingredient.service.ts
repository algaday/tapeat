import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IngredientDto } from './dto';

@Injectable()
export class IngredientService {
  constructor(private prismaService: PrismaService) {}

  async createIngredient(dto: IngredientDto) {
    return await this.prismaService.ingredient.create({ data: { ...dto } });
  }

  async getIngredient(id: string) {
    return await this.prismaService.ingredient.findFirst({
      where: { id },
    });
  }
  async getIngredients(ids?: string[]) {
    if (ids) {
      return this.prismaService.ingredient.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
    } else {
      return this.prismaService.ingredient.findMany();
    }
  }

  async deleteIngredient(id: string) {
    return await this.prismaService.ingredient.delete({ where: { id } });
  }

  async updateIngredient(id: string, dto: IngredientDto) {
    return await this.prismaService.ingredient.update({
      where: { id },
      data: dto,
    });
  }
}
