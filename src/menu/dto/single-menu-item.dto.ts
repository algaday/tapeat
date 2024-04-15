import { IsNotEmpty, IsString } from 'class-validator';

export class SingleMenuItemDto {
  @IsNotEmpty()
  @IsString()
  menuItemId: string;
}
