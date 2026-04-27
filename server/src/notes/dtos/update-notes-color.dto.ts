import { ArrayNotEmpty, IsArray, IsIn, IsInt, IsString } from 'class-validator';
import { colorKey } from '../../../prisma/generated/client';

export class UpdateNotesColorDto {
  @IsArray()
  @ArrayNotEmpty()
  readonly noteIds: string[];

  @IsString()
  @IsIn(Object.keys(colorKey))
  readonly updatedColorKey: colorKey;
}
