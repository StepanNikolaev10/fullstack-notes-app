import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class DeleteNotesDto {
  @IsArray()
  @ArrayNotEmpty()
  readonly noteIds: string[];
}
