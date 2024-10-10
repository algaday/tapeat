import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/use-case.interface';
import { RecipeDto as RecipeUi } from 'src/recipe/presentation/dto/recipe.dto';
import { RecipeMapper } from '../../mappers/recipe.mapper';
import { RecipeNotFoundError } from 'src/recipe/errors/recipe-not-found.error';

import { RecipeRepositoryPort } from 'src/recipe/domain/recipe-repository.port';
import { IngredientService } from 'src/ingredient/ingredient.service';
import {
  RecipeIngredientEntity,
  RecipeIngredientType,
} from 'src/recipe/domain/recipe-ingredient.entity';
import { RecipeIngredientNotFoundError } from 'src/recipe/errors/recipe-ingredient-not-found.error';

interface Props {
  recipeId: string;
  type: RecipeIngredientType;
  quantity: number;
  recipeIngredientId?: string;
  recipeSubRecipeId?: string;
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

  private async getRecipeIngredient(
    props: Props,
  ): Promise<RecipeIngredientEntity> {
    if (props.type === RecipeIngredientType.SUB_RECIPE) {
      return this.handleSubRecipe(props);
    } else {
      return this.handleIngredient(props);
    }
  }

  private async handleSubRecipe(props: Props): Promise<RecipeIngredientEntity> {
    if (!props.recipeSubRecipeId) {
      throw new RecipeIngredientNotFoundError('Sub-recipe ID not provided.');
    }

    const subRecipe = await this.recipeRepository.findById(
      props.recipeSubRecipeId,
    );

    if (!subRecipe) {
      throw new RecipeNotFoundError(
        `Sub-recipe with ID ${props.recipeSubRecipeId} not found.`,
      );
    }

    return RecipeIngredientEntity.create({
      name: subRecipe.getProps().name,
      type: RecipeIngredientType.SUB_RECIPE,
      quantity: props.quantity,
      subRecipeId: subRecipe.getId(),
      ingredientId: null,
    });
  }

  private async handleIngredient(
    props: Props,
  ): Promise<RecipeIngredientEntity> {
    if (!props.recipeIngredientId) {
      throw new RecipeIngredientNotFoundError('Ingredient ID not provided.');
    }

    const ingredient = await this.ingredientService.findById(
      props.recipeIngredientId,
    );

    if (!ingredient) {
      throw new RecipeIngredientNotFoundError(
        `Ingredient with ID ${props.recipeIngredientId} not found.`,
      );
    }

    return RecipeIngredientEntity.create({
      name: ingredient.name,
      type: RecipeIngredientType.INGREDIENT,
      quantity: props.quantity,
      subRecipeId: null,
      ingredientId: ingredient.id,
    });
  }
}
