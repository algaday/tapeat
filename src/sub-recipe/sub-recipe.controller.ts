import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateSubRecipeBodyDto } from './dto';
import { SubRecipeService } from './sub-recipe.service';

@Controller('sub-recipe')
export class SubRecipeController {
  constructor(private subRecipeService: SubRecipeService) {}
  @Post()
  async createSubRecipe(@Body() data: CreateSubRecipeBodyDto) {
    return this.subRecipeService.createSubRecipe(data);
  }

  @Delete(':id')
  async deleteSubRecipe(@Param('id') id: string) {
    return this.subRecipeService.deleteSubRecipe(id);
  }

  @Put(':id')
  async updateSubRecipe(
    @Param() id: string,
    @Body() data: Partial<CreateSubRecipeBodyDto>,
  ) {
    return this.subRecipeService.updateSubRecipe(id, data);
  }

  @Get()
  async getSubRecipes() {
    return this.subRecipeService.getSubRecipes();
  }

  @Get(':id')
  async getSubRecipe(@Param('id') id: string) {
    return this.subRecipeService.getSubRecipe(id);
  }
}
