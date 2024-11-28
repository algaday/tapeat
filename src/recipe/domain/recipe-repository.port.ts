import { IRepository } from 'src/core/domain/repository.interface';

import { RecipeEntity } from './recipe.entity';

export interface RecipeRepositoryPort extends IRepository<RecipeEntity> {
  findByIds(ids: string[]): Promise<RecipeEntity[]>;
}

export const RecipeRepositoryPort: unique symbol = Symbol('RECIPE_REPOSITORY');
