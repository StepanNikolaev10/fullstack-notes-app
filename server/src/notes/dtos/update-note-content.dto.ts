import { IsString, MaxLength } from 'class-validator';

export class UpdateNoteContentDto {
  @IsString()
  readonly noteId: string;

  @IsString()
  @MaxLength(200)
  readonly updatedTitle: string;

  @IsString()
  @MaxLength(10000)
  readonly updatedText: string;
}
