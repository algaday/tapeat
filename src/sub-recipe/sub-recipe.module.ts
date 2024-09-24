import { Module } from '@nestjs/common';
import { SubRecipeController } from './sub-recipe.controller';
import { SubRecipeService } from './sub-recipe.service';
import { SubRecipeRepository } from './sub-recipe.repository';

@Module({
  imports: [],
  controllers: [SubRecipeController],
  providers: [SubRecipeService, SubRecipeRepository],
})
export class SubRecipeModule {}
