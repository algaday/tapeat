import { IsNotEmpty, IsString } from 'class-validator';
import { CreateMenuItemDto } from './create-menu-item.dto';

export class UpdateMenuItemDto extends CreateMenuItemDto {
  @IsNotEmpty()
  @IsString()
  menuItemId: string;
}
