import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { IngredientRepository } from './ingredient.repository';

@Module({
  imports: [],
  controllers: [IngredientController],
  providers: [IngredientService, IngredientRepository],
})
export class IngredientModule {}
