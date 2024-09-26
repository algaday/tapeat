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
import { AuthUser, GetCurrentUser, Public } from 'src/common/decorators';
import { UpdateCategoryDto } from './dto/update-category.dto';

@UseGuards(JwtGuard)
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Public()
  @Get('all/:restaurantId')
  getCategories(@Param('restaurantId') restaurantId: string) {
    return this.categoryService.getCategories(restaurantId);
  }

  @Public()
  @Get('menu-items/:restaurantId')
  getCategoriesWithMenuItems(@Param('restaurantId') restaurantId: string) {
    return this.categoryService.getCategoriesWithMenuItems(restaurantId);
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
