import { Inject, Injectable } from '@nestjs/common';
import { Unit } from 'src/constants/enums/unit.enum';
import { UseCase } from 'src/core/domain/use-case.interface';
import { RecipeDto as RecipeUi } from 'src/recipe/presentation/dto/recipe.dto';
import { RecipeMapper } from '../../mappers/recipe.mapper';
import { RecipeEntity } from 'src/recipe/domain/recipe.entity';
import { RecipeRepositoryPort } from 'src/recipe/domain/recipe-repository.port';
import { RecipeIngredientService } from '../../services/recipe-ingredient.service';

interface Props {
  name: string;
  unit: Unit;
  yield: number;
  isAvailableInInventory?: boolean;
  recipeIngredients?: { quantity: number; id: string }[];
  recipeSubRecipes?: { quantity: number; id: string }[];
}

@Injectable()
export class CreateRecipeUseCase implements UseCase<Props, RecipeUi> {
  constructor(
    private readonly mapper: RecipeMapper,
    @Inject(RecipeRepositoryPort)
    private readonly recipeRepository: RecipeRepositoryPort,
    private readonly recipeIngredientService: RecipeIngredientService,
  ) {}
  async execute(props: Props): Promise<RecipeUi> {
    const { recipeIngredients, subRecipes } =
      await this.recipeIngredientService.getValidatedRecipeIngredients(
        props.recipeIngredients,
        props.recipeSubRecipes,
      );
    const recipe = RecipeEntity.create({
      ...props,
      recipeIngredients: recipeIngredients,
      recipeSubRecipes: subRecipes,
    });

    await this.recipeRepository.create(recipe);
    return this.mapper.toUi(recipe);
  }
}
