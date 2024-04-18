import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteMenuItemDto {
  @IsString()
  @IsNotEmpty()
  menuItemId: string;
}
