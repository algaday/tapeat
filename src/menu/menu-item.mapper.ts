import { MenuItemWithImage, MenuItemWithImageDto } from './dto/menu-item.dto';

export class MenuItemMapper {
  static toDto(entity: MenuItemWithImage): MenuItemWithImageDto {
    const {
      id,
      categoryId,
      description,
      nameOfDish,
      price,
      restaurantId,
      createdAt,
      updatedAt,
      category,
      image: {
        id: imageId,
        originalPath,
        mediumThumbnailPath,
        smallThumbnailPath,
      },
      modificationGroups,
    } = entity;

    const formattedModificationGroups = modificationGroups.map(
      ({ modificationGroup }) => {
        const modifications = modificationGroup.modifications;
        return {
          id: modificationGroup.id,
          isMultipleChoice: modificationGroup.isMultipleChoice,
          isMandatory: modificationGroup.isMandatory,
          name: modificationGroup.name,
          modifications,
        };
      },
    );

    return {
      id,
      categoryId,
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
      category,
      modificationGroups: formattedModificationGroups,
    };
  }
}
