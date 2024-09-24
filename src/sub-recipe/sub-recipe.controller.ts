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

  @Get()
  async getAll() {
    return this.subRecipeService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.subRecipeService.findById(id);
  }
}
