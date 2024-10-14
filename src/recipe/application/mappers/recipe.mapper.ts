import { RecipeEntity } from 'src/recipe/domain/recipe.entity';
import {
  RecipeItemDto,
  RecipeDto as RecipeUi,
} from 'src/recipe/presentation/dto/recipe.dto';
import { Unit } from 'src/constants/enums/unit.enum';
import { Injectable } from '@nestjs/common';
import {
  RecipeItemEntity,
  RecipeItemType,
} from 'src/recipe/domain/recipe-item.entity';
import { RecipeDbRecord } from 'src/recipe/infra/repositories/prisma-recipe-repository.adapter';

@Injectable()
export class RecipeMapper {
  toDomain(record: RecipeDbRecord): RecipeEntity {
    const recipeIngredients = record.ingredients.map(
      (item) =>
        new RecipeItemEntity({
          id: item.id,
          props: {
            name: item.ingredient?.name,
            type: RecipeItemType.INGREDIENT,
            quantity: item.quantity,
          },
        }),
    );
    const recipeSubRecipes = record.usedAsSubRecipe.map(
      (item) =>
        new RecipeItemEntity({
          id: item.id,
          props: {
            name: item.subRecipe?.name,
            type: RecipeItemType.SUB_RECIPE,
            quantity: item.quantity,
          },
        }),
    );

    return new RecipeEntity({
      id: record.id,
      props: {
        name: record.name,
        unit: record.unit as Unit,
        yield: record.yield.toNumber(),
        isAvailableInInventory: record.isAvailableInInventory,
        recipeItems: [...recipeIngredients, ...recipeSubRecipes],
      },
    });
  }
  private mapRecipeItemUi(entity: RecipeItemEntity): RecipeItemDto {
    const props = entity.getProps();

    return {
      id: entity.getId(),
      name: props.name,
      type: props.type,
      quantity: props.quantity,
    };
  }

  toUi(entity: RecipeEntity): RecipeUi {
    const props = entity.getProps();
    return {
      id: props.id,
      name: props.name,
      unit: props.unit,
      yield: props.yield,
      isAvailableInInventory: props.isAvailableInInventory,
      recipeItems: props.recipeItems?.map((item) => this.mapRecipeItemUi(item)),
    };
  }
}
