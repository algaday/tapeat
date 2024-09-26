import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubRecipeBodyDto } from './dto';

@Injectable()
export class SubRecipeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateSubRecipeBodyDto) {
    return this.prismaService.recipeIngredient.create({ data });
  }

  async update(id: string, data: Partial<CreateSubRecipeBodyDto>) {
    return this.prismaService.recipeIngredient.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prismaService.recipeIngredient.delete({ where: { id } });
  }

  async findRecipeIngredientsWithSubs(recipeId: string) {
    return this.prismaService.recipe.findUnique({
      where: { id: recipeId },
      include: {
        recipeIngredients: {
          include: { ingredient: true, subRecipe: true },
        },
        subRecipeIngredients: {
          include: { ingredient: true, subRecipe: true },
        },
      },
    });
  }
}
