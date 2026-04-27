import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class UnarchiveNotesDto {
  @IsArray()
  @ArrayNotEmpty()
  readonly noteIds: string[];
}
