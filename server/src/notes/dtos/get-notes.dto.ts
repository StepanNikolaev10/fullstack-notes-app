import {
  IsEnum,
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { status } from '../../../prisma/generated/enums';

// Небольшое улучшение: делаем enum строковым.
// Иначе в URL придется передавать числа (?sort=1), а не читаемый текст (?sort=created_at).
export enum SORT_METHODS {
  CUSTOM = 'custom',
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
}
export class GetNotesDto {
  @IsEnum(status)
  readonly status: status;

  @IsOptional()
  @IsEnum(SORT_METHODS)
  readonly sort?: SORT_METHODS = SORT_METHODS.CUSTOM;

  @IsOptional()
  @IsString()
  readonly search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  readonly limit?: number = 20;

  @IsOptional()
  @IsUUID()
  readonly last_id?: string;
}
