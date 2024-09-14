import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { AuthUser } from 'src/common/decorators';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryNotFoundError } from './errors/catergory-not-found.error';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  getCategories(user: AuthUser) {
    return this.prisma.menuItemCategory.findMany({
      where: {
        restaurantId: user.restaurantId,
      },
    });
  }

  getCategoriesWithMenuItems(user: AuthUser) {
    return this.prisma.menuItemCategory.findMany({
      where: {
        restaurantId: user.restaurantId,
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
        name: dto.name,
        restaurantId: user.restaurantId,
      },
    });
  }

  delete(id: string) {
    return this.prisma.menuItemCategory.delete({
      where: {
        id,
      },
    });
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
