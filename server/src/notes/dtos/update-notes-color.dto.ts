import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsIn,
  IsString,
} from 'class-validator';
import { colorKey } from '../../../prisma/generated/client';

export class UpdateNotesColorDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  readonly noteIds: string[];

  @IsString()
  @IsIn(Object.keys(colorKey))
  readonly updatedColorKey: colorKey;
}
