import { IsInt, IsString, MaxLength, Min } from "class-validator";

export class UpdateNoteContentDto {
  @IsInt()
  @Min(1)
  readonly noteId: number;
  
  @IsString()
  @MaxLength(200, { message: 'Title cannot be longer than 200 characters' })
  readonly updatedTitle: string;

  @IsString()
  @MaxLength(10000, { message: 'Main text cannot be longer than 10000 characters' })
  readonly updatedMainText: string;
}