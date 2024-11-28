import { Inject, Injectable } from '@nestjs/common';
import { Unit } from 'src/constants/enums/unit.enum';
import { UseCase } from 'src/core/domain/use-case.interface';
import { RecipeDto as RecipeUi } from 'src/recipe/presentation/dto/recipe.dto';
import { RecipeMapper } from '../../mappers/recipe.mapper';
import { RecipeEntity } from 'src/recipe/domain/recipe.entity';
import { RecipeRepositoryPort } from 'src/recipe/domain/recipe-repository.port';
import {
  RecipeItemProps,
  RecipeItemService,
} from '../../services/recipe-item.service';

interface Props {
  name: string;
  unit: Unit;
  yield: number;
  isAvailableInInventory?: boolean;
  recipeItems?: RecipeItemProps[];
}

@Injectable()
export class CreateRecipeUseCase implements UseCase<Props, RecipeUi> {
  constructor(
    private readonly mapper: RecipeMapper,
    @Inject(RecipeRepositoryPort)
    private readonly recipeRepository: RecipeRepositoryPort,
    private readonly recipeItemService: RecipeItemService,
  ) {}
  async execute(props: Props): Promise<RecipeUi> {
    const recipeItems = await this.recipeItemService.getValidatedRecipeItems(
      props.recipeItems,
    );
    const recipe = RecipeEntity.create({
      ...props,
      recipeItems,
    });

    await this.recipeRepository.create(recipe);
    return this.mapper.toUi(recipe);
  }
}
