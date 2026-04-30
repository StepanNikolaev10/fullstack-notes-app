import { IsInt, IsString } from 'class-validator';

export class UpdateNotePositionDto {
  @IsString()
  readonly noteId: string;

  @IsInt()
  readonly updatedPositionNumber: number;
}
