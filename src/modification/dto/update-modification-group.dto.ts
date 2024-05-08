import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class AddModificationDto {
  @IsString()
  @IsNotEmpty()
  modificationGroupId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsNotEmpty()
  @IsBoolean()
  isMandatory: boolean;
}
