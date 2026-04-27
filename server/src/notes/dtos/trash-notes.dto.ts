import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class TrashNotesDto {
  @IsArray()
  @ArrayNotEmpty()
  readonly noteIds: string[];
}
