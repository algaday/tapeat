import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecipeEntity } from '../../domain/recipe.entity';
import { RecipeMapper } from 'src/recipe/application/mappers/recipe.mapper';
import { RepositoryBase } from 'src/core/domain/repository.base';
import { RecipeRepositoryPort } from 'src/recipe/domain/recipe-repository.port';
import {
  Paginated,
  PaginatedQueryParams,
} from 'src/core/domain/repository.interface';
import { Decimal } from '@prisma/client/runtime/library';
import { Prisma, RecipeIngredient } from '@prisma/client';
import {
  RecipeItemEntity,
  RecipeItemType,
} from 'src/recipe/domain/recipe-item.entity';

const RecipePrismaValidator = Prisma.validator<Prisma.RecipeDefaultArgs>()({
  include: {
    ingredients: { include: { ingredient: true } },
    usedAsSubRecipe: { include: { subRecipe: true } },
  },
});

export type RecipeDbRecord = Prisma.RecipeGetPayload<
  typeof RecipePrismaValidator
>;

@Injectable()
export class PrismaRecipeRepositoryAdapter
  extends RepositoryBase<RecipeEntity>
  implements RecipeRepositoryPort
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: RecipeMapper,
  ) {
    super(prisma);
  }

  async create(recipe: RecipeEntity): Promise<void> {
    await this.prisma.$transaction(async () => {
      await this.prisma.recipe.create({
        data: this.mapToRecipeDbRecord(recipe),
      });
      const subRecipes = recipe
        .getSubRecipes()
        .map((subRecipe) =>
          this.mapToRecipeIngredientDbRecord(recipe.getId(), subRecipe),
        );
      const ingredients = recipe
        .getIngredients()
        .map((ingredient) =>
          this.mapToRecipeIngredientDbRecord(recipe.getId(), ingredient),
        );
      await this.prisma.recipeIngredient.createMany({
        data: [...subRecipes, ...ingredients],
      });
    });
  }
  private mapToRecipeDbRecord(
    recipe: RecipeEntity,
  ): Omit<RecipeDbRecord, 'ingredients' | 'usedAsSubRecipe'> {
    const props = recipe.getProps();

    return {
      id: props.id,
      name: props.name,
      isAvailableInInventory: props.isAvailableInInventory,
      unit: props.unit,
      yield: new Decimal(props.yield),
    };
  }
  private mapToRecipeIngredientDbRecord(
    recipeId: string,
    recipeItem: RecipeItemEntity,
  ): RecipeIngredient {
    const props = recipeItem.getProps();

    return {
      id: props.id,
      recipeId,
      ingredientId:
        props.type === RecipeItemType.INGREDIENT ? props.itemId : null,
      subRecipeId:
        props.type === RecipeItemType.SUB_RECIPE ? props.itemId : null,
      quantity: props.quantity,
    };
  }

  async createMany(recipes: RecipeEntity[]) {
    const data = recipes.map((recipe) => this.mapToRecipeDbRecord(recipe));
    return this.prisma.recipe.createMany({ data });
  }

  async findById(id: string): Promise<RecipeEntity | null> {
    const recipe = await this.prisma.recipe.findUnique({
      ...RecipePrismaValidator,
      where: { id },
    });
    return recipe ? this.mapper.toDomain(recipe) : null;
  }

  async findAll(): Promise<RecipeEntity[]> {
    const recipes = await this.prisma.recipe.findMany({
      ...RecipePrismaValidator,
    });

    return recipes.map((record) => this.mapper.toDomain(record));
  }
  async findByIds(ids: string[]) {
    const recipes = await this.prisma.recipe.findMany({
      ...RecipePrismaValidator,
      where: { id: { in: ids } },
    });

    return recipes.map((record) => this.mapper.toDomain(record));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(recipe: RecipeEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(recipe: RecipeEntity): Promise<boolean> {
    return !!this.prisma.recipe.delete({ where: { id: recipe.getId() } });
  }

  //todo: fix eslint and finish the method
  findAllPaginated(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    params: PaginatedQueryParams,
  ): Promise<Paginated<RecipeEntity>> {
    throw new Error('Method not implemented.');
  }
}
