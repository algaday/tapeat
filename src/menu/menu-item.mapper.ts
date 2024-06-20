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
      modificationGroups,
    } = entity;

    const formattedModificationGroups = modificationGroups.map(
      (modificationGroup) => {
        const modifications = modificationGroup.modificationGroup.modifications;
        return {
          id: modificationGroup.modificationGroup.id,
          isMultipleChoice:
            modificationGroup.modificationGroup.isMultipleChoice,
          name: modificationGroup.modificationGroup.name,
          modifications,
        };
      },
    );

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
      modificationGroups: formattedModificationGroups,
    };
  }
}
