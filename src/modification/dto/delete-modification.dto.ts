import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteModificationGroupDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
