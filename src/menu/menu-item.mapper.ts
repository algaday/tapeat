import { MenuItemWithImage, MenuItemWithImageDto } from './dto/menu-item.dto';

export class MenuItemMapper {
  static toDto(entity: MenuItemWithImage): MenuItemWithImageDto {
    const {
      id,
      category,
      description,
      nameOfDish,
      price,
      restaurantId,
      createdAt,
      updatedAt,
      image: {
        id: imageId,
        originalPath,
        mediumThumbnailPath,
        smallThumbnailPath,
      },
    } = entity;

    return {
      id,
      category,
      description,
      nameOfDish,
      price: String(price),
      restaurantId,
      createdAt: String(createdAt),
      updatedAt: String(updatedAt),
      image: {
        imageId,
        restaurantId,
        originalPath,
        mediumThumbnailPath,
        smallThumbnailPath,
      },
    };
  }
}
