import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtGuard } from 'src/common/guards/jwt-guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthUser, GetCurrentUser } from 'src/common/decorators';
import { UpdateCategoryDto } from './dto/update-category.dto';

@UseGuards(JwtGuard)
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('all')
  getCategories(@GetCurrentUser() user: AuthUser) {
    return this.categoryService.getCategories(user);
  }

  @Get('menu-items')
  getCategoriesWithMenuItems(@GetCurrentUser() user: AuthUser) {
    return this.categoryService.getCategoriesWithMenuItems(user);
  }
  @Post()
  create(@GetCurrentUser() user: AuthUser, @Body() dto: CreateCategoryDto) {
    return this.categoryService.create(user, dto);
  }

  @Post('update')
  update(@Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(dto.id, dto);
  }

  @Delete(':id')
  delete(@Param('id') categoryId: string) {
    return this.categoryService.delete(categoryId);
  }
}
