import { Inject, Injectable } from '@nestjs/common';
import { keyBy } from 'lodash';
import {
  RecipeItemEntity,
  RecipeItemType,
} from 'src/recipe/domain/recipe-item.entity';
import { RecipeRepositoryPort } from 'src/recipe/domain/recipe-repository.port';
import { IngredientRepository } from 'src/ingredient/ingredient.repository';
import { RecipeIngredientNotFoundError } from 'src/recipe/errors/recipe-ingredient-not-found.error';

export interface RecipeItemProps {
  quantity: number;
  id: string;
  type: RecipeItemType;
}

@Injectable()
export class RecipeItemService {
  constructor(
    @Inject(RecipeRepositoryPort)
    private readonly recipeRepository: RecipeRepositoryPort,
    private readonly ingredientRepository: IngredientRepository,
  ) {}

  async getValidatedRecipeItems(
    recipeItems: RecipeItemProps[],
  ): Promise<RecipeItemEntity[]> {
    if (!recipeItems) {
      return [];
    }

    const ingredientItems = recipeItems.filter(
      (item) => item.type === RecipeItemType.INGREDIENT,
    );
    const subRecipeItems = recipeItems.filter(
      (item) => item.type === RecipeItemType.SUB_RECIPE,
    );

    const ingredientMapByIds =
      await this.getIngredientMapByIds(ingredientItems);
    const subRecipeMapByIds = await this.getSubRecipeMapByIds(subRecipeItems);

    const mappedIngredients = this.mapItemsToEntities(
      ingredientItems,
      ingredientMapByIds,
      RecipeItemType.INGREDIENT,
    );
    const mappedSubRecipes = this.mapItemsToEntities(
      subRecipeItems,
      subRecipeMapByIds,
      RecipeItemType.SUB_RECIPE,
    );

    return [...mappedIngredients, ...mappedSubRecipes];
  }

  private async getIngredientMapByIds(
    recipeItems: RecipeItemProps[],
  ): Promise<Record<string, any>> {
    const ingredients = await this.ingredientRepository.findByIds(
      recipeItems.map((item) => item.id),
    );

    return keyBy(ingredients, (ingredient) => ingredient.id);
  }

  private async getSubRecipeMapByIds(
    recipeItems: RecipeItemProps[],
  ): Promise<Record<string, any>> {
    const subRecipes = await this.recipeRepository.findByIds(
      recipeItems.map((item) => item.id),
    );

    return keyBy(subRecipes, (subRecipe) => subRecipe.getId());
  }

  private mapItemsToEntities(
    recipeItems: RecipeItemProps[],
    itemMapByIds: Record<string, any>,
    type: RecipeItemType,
  ): RecipeItemEntity[] {
    return recipeItems.map((item) => {
      const foundItem = itemMapByIds[item.id];
      if (!foundItem) {
        throw new RecipeIngredientNotFoundError(
          `${type === RecipeItemType.INGREDIENT ? 'Ingredient' : 'Sub-recipe'} with ID ${item.id} not found.`,
        );
      }

      return new RecipeItemEntity({
        id: foundItem.id,
        props: {
          name: foundItem.name,
          type,
          quantity: item.quantity,
        },
      });
    });
  }
}
