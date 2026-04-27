import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class RestoreTrashedNotesDto {
  @IsArray()
  @ArrayNotEmpty()
  readonly noteIds: string[];
}
