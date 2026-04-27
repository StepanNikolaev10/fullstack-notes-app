import { ArrayNotEmpty, IsArray } from 'class-validator';

export class ArchiveNotesDto {
  @IsArray()
  @ArrayNotEmpty()
  readonly noteIds: string[];
}
