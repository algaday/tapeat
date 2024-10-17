import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/use-case.interface';
import { RecipeDto as RecipeUi } from 'src/recipe/presentation/dto/recipe.dto';
import { RecipeMapper } from '../../mappers/recipe.mapper';
import { RecipeNotFoundError } from 'src/recipe/errors/recipe-not-found.error';
import { Unit } from 'src/constants/enums/unit.enum';
import { RecipeRepositoryPort } from 'src/recipe/domain/recipe-repository.port';

interface Props {
  recipeId: string;
  name: string;
  unit: Unit;
  yield: number;
  isAvailableInInventory: boolean;
}

@Injectable()
export class UpdateRecipeUseCase implements UseCase<Props, RecipeUi> {
  constructor(
    private readonly mapper: RecipeMapper,
    @Inject(RecipeRepositoryPort)
    private readonly recipeRepository: RecipeRepositoryPort,
  ) {}
  async execute(props: Props): Promise<RecipeUi> {
    const recipe = await this.recipeRepository.findById(props.recipeId);

    if (!recipe) {
      throw new RecipeNotFoundError();
    }

    recipe.update({
      ...props,
    });

    await this.recipeRepository.update(recipe);

    return this.mapper.toUi(recipe);
  }
}
