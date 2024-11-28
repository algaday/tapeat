import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/use-case.interface';
import { RecipeDto as RecipeUi } from 'src/recipe/presentation/dto/recipe.dto';
import { RecipeMapper } from '../../mappers/recipe.mapper';
import { RecipeNotFoundError } from 'src/recipe/errors/recipe-not-found.error';
import { RecipeRepositoryPort } from 'src/recipe/domain/recipe-repository.port';

interface Props {
  recipeId: string;
}

@Injectable()
export class GetRecipeUseCase implements UseCase<Props, RecipeUi> {
  constructor(
    private readonly mapper: RecipeMapper,
    @Inject(RecipeRepositoryPort)
    private readonly recipeRepository: RecipeRepositoryPort,
  ) {}
  async execute(props: Props): Promise<RecipeUi> {
    const recipe = await this.recipeRepository.findById(props.recipeId);
    if (!recipe) {
      throw new RecipeNotFoundError(
        `Recipe with id:${props.recipeId} do not exists`,
      );
    }
    return this.mapper.toUi(recipe);
  }
}
