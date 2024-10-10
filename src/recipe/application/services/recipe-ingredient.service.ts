import { Inject, Injectable } from '@nestjs/common';
import { keyBy } from 'lodash';
import {
  RecipeIngredientEntity,
  RecipeIngredientType,
} from 'src/recipe/domain/recipe-ingredient.entity';
import { RecipeRepositoryPort } from 'src/recipe/domain/recipe-repository.port';
import { IngredientRepository } from 'src/ingredient/ingredient.repository';
import { RecipeIngredientNotFoundError } from 'src/recipe/errors/recipe-ingredient-not-found.error';

@Injectable()
export class RecipeIngredientService {
  constructor(
    @Inject(RecipeRepositoryPort)
    private readonly recipeRepository: RecipeRepositoryPort,
    private readonly ingredientRepository: IngredientRepository,
  ) {}

  async getValidatedRecipeIngredients(
    recipeIngredient: { quantity: number; id: string }[],
    recipeSubRecipe: { quantity: number; id: string }[],
  ): Promise<{
    recipeIngredients: RecipeIngredientEntity[];
    subRecipes: RecipeIngredientEntity[];
  }> {
    const ingredientMapByIds = await this.getIngredientMapByIds(
      recipeIngredient.map(({ id }) => id),
    );

    const subRecipeMapByIds = await this.getSubRecipeMapByIds(
      recipeSubRecipe.map(({ id }) => id),
    );

    const recipeIngredients = this.mapIngredientsToEntities(
      recipeIngredient,
      ingredientMapByIds,
    );

    const subRecipes = this.mapSubRecipesToEntities(
      recipeSubRecipe,
      subRecipeMapByIds,
    );

    return { recipeIngredients, subRecipes };
  }

  private async getIngredientMapByIds(
    ingredientIds: string[],
  ): Promise<Record<string, any>> {
    const ingredients =
      await this.ingredientRepository.findByIds(ingredientIds);

    return keyBy(ingredients, (ingredient) => ingredient.id);
  }

  private async getSubRecipeMapByIds(
    subRecipeIds: string[],
  ): Promise<Record<string, any>> {
    const subRecipes = await this.recipeRepository.findByIds(subRecipeIds);

    return keyBy(subRecipes, (subRecipe) => subRecipe.getId());
  }

  private mapIngredientsToEntities(
    recipeIngredient: { quantity: number; id: string }[],
    ingredientMapByIds: Record<string, any>,
  ): RecipeIngredientEntity[] {
    return recipeIngredient.map((ingredient) => {
      const foundIngredient = ingredientMapByIds[ingredient.id];
      if (!foundIngredient) {
        throw new RecipeIngredientNotFoundError(
          `Ingredient with ID ${ingredient.id} not found.`,
        );
      }

      return RecipeIngredientEntity.create({
        ingredientId: foundIngredient.id,
        subRecipeId: null,
        name: foundIngredient.name,
        type: RecipeIngredientType.INGREDIENT,
        quantity: ingredient.quantity,
      });
    });
  }

  private mapSubRecipesToEntities(
    recipeSubRecipe: { quantity: number; id: string }[],
    subRecipeMapByIds: Record<string, any>,
  ): RecipeIngredientEntity[] {
    return recipeSubRecipe.map((subRecipe) => {
      const foundSubRecipe = subRecipeMapByIds[subRecipe.id];
      if (!foundSubRecipe) {
        throw new RecipeIngredientNotFoundError(
          `Sub-recipe with ID ${subRecipe.id} not found.`,
        );
      }

      return RecipeIngredientEntity.create({
        ingredientId: null,
        subRecipeId: foundSubRecipe.getId(),
        name: foundSubRecipe.getProps().name,
        type: RecipeIngredientType.SUB_RECIPE,
        quantity: subRecipe.quantity,
      });
    });
  }
}
