import { Inject, Injectable } from '@nestjs/common';
import { keyBy } from 'lodash';
import { IngredientRepository } from 'src/ingredient/ingredient.repository';
import { InventoryCountItemEntity } from 'src/inventory-count/domain/inventory-count-item.entity';
import { InventoryCountItemType } from 'src/inventory-count/domain/inventory-count.entity';
import { InventoryCountNotFoundError } from 'src/inventory-count/errors/inventory-count-not-found.error';
import { RecipeRepositoryPort } from 'src/recipe/domain/recipe-repository.port';

export interface InventoryCountItemProps {
  quantity: number;
  id: string;
  type: InventoryCountItemType;
}

@Injectable()
export class InventoryCountItemService {
  constructor(
    @Inject(RecipeRepositoryPort)
    private readonly recipeRepository: RecipeRepositoryPort,
    private readonly ingredientRepository: IngredientRepository,
  ) {}

  async getValidatedInventoryCountItems(
    inventoryCountItems: InventoryCountItemProps[],
  ): Promise<InventoryCountItemEntity[]> {
    if (!inventoryCountItems) {
      return [];
    }

    const inventoryCountIngredients = inventoryCountItems.filter(
      (item) => item.type === InventoryCountItemType.INGREDIENT,
    );

    const inventoryCountRecipes = inventoryCountItems.filter(
      (item) => item.type === InventoryCountItemType.RECIPE,
    );

    const ingredientMapByIds = await this.getIngredientMapByIds(
      inventoryCountIngredients,
    );

    const recipeMapByIds = await this.getRecipeMapByIds(inventoryCountRecipes);

    const mappedIngredients = this.mapItemsToEntities(
      inventoryCountIngredients,
      ingredientMapByIds,
      InventoryCountItemType.INGREDIENT,
    );

    const mappedRecipes = this.mapItemsToEntities(
      inventoryCountRecipes,
      recipeMapByIds,
      InventoryCountItemType.RECIPE,
    );

    return [...mappedIngredients, ...mappedRecipes];
  }

  private async getIngredientMapByIds(
    inventoryCountItems: InventoryCountItemProps[],
  ): Promise<Record<string, any>> {
    const ingredients = await this.ingredientRepository.findByIds(
      inventoryCountItems.map((item) => item.id),
    );

    return keyBy(ingredients, (ingredient) => ingredient.id);
  }

  private async getRecipeMapByIds(
    inventoryCountItems: InventoryCountItemProps[],
  ): Promise<Record<string, any>> {
    const recipes = await this.recipeRepository.findByIds(
      inventoryCountItems.map((item) => item.id),
    );

    return keyBy(recipes, (recipe) => recipe.getId());
  }

  private mapItemsToEntities(
    inventoryCountItems: InventoryCountItemProps[],
    itemMapByIds: Record<string, any>,
    type: InventoryCountItemType,
  ): InventoryCountItemEntity[] {
    return inventoryCountItems.map((item) => {
      const foundItem = itemMapByIds[item.id];
      if (!foundItem) {
        throw new InventoryCountNotFoundError(
          `${type === InventoryCountItemType.INGREDIENT ? 'Ingredient' : 'Recipe'} with ID ${item.id} not found.`,
        );
      }
      return InventoryCountItemEntity.create({
        itemId:
          type === InventoryCountItemType.INGREDIENT
            ? foundItem.id
            : foundItem.getId(),
        type,
        quantity: foundItem.quantity,
        storageName: foundItem.storageName,
      });
    });
  }
}
