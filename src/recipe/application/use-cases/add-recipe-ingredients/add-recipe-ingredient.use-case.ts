import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/use-case.interface';
import { RecipeDto as RecipeUi } from 'src/recipe/presentation/dto/recipe.dto';
import { RecipeMapper } from '../../mappers/recipe.mapper';
import { RecipeNotFoundError } from 'src/recipe/errors/recipe-not-found.error';

import { RecipeRepositoryPort } from 'src/recipe/domain/recipe-repository.port';
import { IngredientService } from 'src/ingredient/ingredient.service';

import { RecipeIngredientNotFoundError } from 'src/recipe/errors/recipe-ingredient-not-found.error';
import {
  RecipeItemEntity,
  RecipeItemType,
} from 'src/recipe/domain/recipe-item.entity';

interface Props {
  recipeId: string;
  type: RecipeItemType;
  quantity: number;
  recipeItemId?: string;
}

@Injectable()
export class AddRecipeIngredientsUseCase implements UseCase<Props, RecipeUi> {
  constructor(
    private readonly recipeMapper: RecipeMapper,
    @Inject(RecipeRepositoryPort)
    private readonly recipeRepository: RecipeRepositoryPort,
    private readonly ingredientService: IngredientService,
  ) {}

  async execute(props: Props): Promise<RecipeUi> {
    const recipe = await this.recipeRepository.findById(props.recipeId);

    if (!recipe) {
      throw new RecipeNotFoundError();
    }

    const recipeIngredient = await this.getRecipeIngredient(props);

    recipe.addRecipeIngredient(recipeIngredient);

    await this.recipeRepository.update(recipe);

    return this.recipeMapper.toUi(recipe);
  }

  private async getRecipeIngredient(props: Props): Promise<RecipeItemEntity> {
    if (props.type === RecipeItemType.SUB_RECIPE) {
      return this.handleSubRecipe(props);
    } else {
      return this.handleIngredient(props);
    }
  }

  private async handleSubRecipe(props: Props): Promise<RecipeItemEntity> {
    if (!props.recipeItemId) {
      throw new RecipeIngredientNotFoundError('Sub-recipe ID not provided.');
    }

    const subRecipe = await this.recipeRepository.findById(props.recipeItemId);

    if (!subRecipe) {
      throw new RecipeNotFoundError(
        `Sub-recipe with ID ${props.recipeItemId} not found.`,
      );
    }

    return RecipeItemEntity.create({
      name: subRecipe.getProps().name,
      type: RecipeItemType.SUB_RECIPE,
      quantity: props.quantity,
      itemId: subRecipe.getId(),
    });
  }

  private async handleIngredient(props: Props): Promise<RecipeItemEntity> {
    if (!props.recipeItemId) {
      throw new RecipeIngredientNotFoundError('Ingredient ID not provided.');
    }

    const ingredient = await this.ingredientService.findById(
      props.recipeItemId,
    );

    if (!ingredient) {
      throw new RecipeIngredientNotFoundError(
        `Ingredient with ID ${props.recipeItemId} not found.`,
      );
    }

    return RecipeItemEntity.create({
      name: ingredient.name,
      type: RecipeItemType.INGREDIENT,
      quantity: props.quantity,
      itemId: ingredient.id,
    });
  }
}
