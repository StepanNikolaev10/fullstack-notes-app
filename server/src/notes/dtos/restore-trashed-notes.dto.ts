import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsString,
} from 'class-validator';

export class RestoreTrashedNotesDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  readonly noteIds: string[];
}
