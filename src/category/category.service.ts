import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthUser } from 'src/common/decorators';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryNotFoundError } from './errors/catergory-not-found.error';
import { GetCategoryMapper } from './mapper/get-categories.mapper';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getCategories(restaurantId: string) {
    const categories = await this.prisma.menuItemCategory.findMany({
      where: {
        restaurantId,
      },
    });

    return categories.map((category) => GetCategoryMapper.toRespone(category));
  }

  getCategoriesWithMenuItems(restaurantId: string) {
    return this.prisma.menuItemCategory.findMany({
      where: {
        restaurantId,
      },
      include: {
        menuItems: {
          include: {
            image: true,
          },
        },
      },
    });
  }

  create(user: AuthUser, dto: CreateCategoryDto) {
    return this.prisma.menuItemCategory.create({
      data: {
        name: dto.category,
        restaurantId: user.restaurantId,
      },
    });
  }

  async delete(id: string) {
    const category = await this.prisma.menuItemCategory.delete({
      where: {
        id,
      },
    });

    return GetCategoryMapper.toRespone(category);
  }

  update(id: string, dto: UpdateCategoryDto) {
    const menuCategory = this.prisma.menuItemCategory.findUnique({
      where: {
        id,
      },
    });

    if (!menuCategory) {
      throw new CategoryNotFoundError();
    }

    return this.prisma.menuItemCategory.update({
      where: {
        id,
      },
      data: { name: dto.name },
    });
  }
}
