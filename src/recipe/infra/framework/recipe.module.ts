import { Module } from '@nestjs/common';
import { RecipeController } from 'src/recipe/presentation/recipe.controller';
import { PrismaRecipeRepositoryAdapter } from '../repositories/prisma-recipe-repository.adapter';
import { RecipeMapper } from 'src/recipe/application/mappers/recipe.mapper';
import {
  RECIPE_APPLICATION_SERVICES,
  RECIPE_USE_CASES,
} from 'src/recipe/application/use-cases';
import { RecipeRepositoryPort } from 'src/recipe/domain/recipe-repository.port';
import { IngredientModule } from 'src/ingredient/ingredient.module';

const REPOSITORIES = [
  {
    provide: RecipeRepositoryPort,
    useClass: PrismaRecipeRepositoryAdapter,
  },
];

@Module({
  imports: [IngredientModule],
  controllers: [RecipeController],
  providers: [
    RecipeMapper,
    ...RECIPE_USE_CASES,
    ...RECIPE_APPLICATION_SERVICES,
    ...REPOSITORIES,
  ],
  exports: [...REPOSITORIES],
})
export class RecipeModule {}
