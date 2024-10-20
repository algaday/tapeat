import { Entity } from 'src/core/domain/entity.base';
import { RecipeItemType } from 'src/recipe/domain/recipe-item.entity';

interface Props {
  itemId: string;
  type: RecipeItemType;
  quantity: number;
}

export class InventoryCountItemEntity extends Entity<Props> {
  static create(props: Props) {
    return new InventoryCountItemEntity({ props });
  }
}
