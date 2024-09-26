import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { CreateSubRecipeBodyDto } from './dto';
import { SubRecipeService } from './sub-recipe.service';

@Controller('sub-recipes')
export class SubRecipeController {
  constructor(private subRecipeService: SubRecipeService) {}
  @Post()
  async create(@Body() data: CreateSubRecipeBodyDto) {
    return this.subRecipeService.create(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.subRecipeService.delete(id);
  }

  @Put(':id')
  async update(
    @Param() id: string,
    @Body() data: Partial<CreateSubRecipeBodyDto>,
  ) {
    return this.subRecipeService.update(id, data);
  }
}
