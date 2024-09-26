import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { RecipeRepository } from './recipe.repository';
import { SubRecipeModule } from 'src/sub-recipe/sub-recipe.module';

@Module({
  imports: [SubRecipeModule],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository],
})
export class RecipeModule {}
