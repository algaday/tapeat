import { RecipeEntity } from 'src/recipe/domain/recipe.entity';
import {
  RecipeIngredientDto,
  RecipeDto as RecipeUi,
} from 'src/recipe/presentation/dto/recipe.dto';
import { Unit } from 'src/constants/enums/unit.enum';
import { Injectable } from '@nestjs/common';
import {
  RecipeIngredientEntity,
  RecipeIngredientType,
} from 'src/recipe/domain/recipe-ingredient.entity';
import { RecipeDbRecord } from 'src/recipe/infra/repositories/prisma-recipe-repository.adapter';

@Injectable()
export class RecipeMapper {
  toDomain(record: RecipeDbRecord): RecipeEntity {
    const recipeIngredients = record.ingredients.map((item) =>
      RecipeIngredientEntity.create({
        ingredientId: item.id,
        name: item.ingredient?.name,
        type: RecipeIngredientType.INGREDIENT,
        quantity: item.quantity,
        subRecipeId: null,
      }),
    );
    const recipeSubRecipes = record.usedAsSubRecipe.map((item) =>
      RecipeIngredientEntity.create({
        subRecipeId: item.id,
        name: item.subRecipe?.name,
        type: RecipeIngredientType.SUB_RECIPE,
        quantity: item.quantity,
        ingredientId: null,
      }),
    );

    return new RecipeEntity({
      id: record.id,
      props: {
        name: record.name,
        unit: record.unit as Unit,
        yield: record.yield.toNumber(),
        isAvailableInInventory: record.isAvailableInInventory,
        recipeIngredients: recipeIngredients,
        recipeSubRecipes: recipeSubRecipes,
      },
    });
  }

  private mapRecipeIngredientUi(
    entity: RecipeIngredientEntity,
  ): RecipeIngredientDto {
    const props = entity.getProps();

    return {
      id: props.id,
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
      recipeIngredients: props.recipeIngredients?.map((item) =>
        this.mapRecipeIngredientUi(item),
      ),
    };
  }
}
