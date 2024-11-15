import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class GetInventoryCountDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Type(() => String)
  ids: string[];
}
