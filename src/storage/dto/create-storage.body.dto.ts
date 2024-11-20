import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateStorageBodyDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateStoragesDto {
  @ValidateNested({ each: true })
  @Type(() => CreateStorageBodyDto)
  items: CreateStorageBodyDto[];
}
