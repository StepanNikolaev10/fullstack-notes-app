import { Expose, Type } from "class-transformer";

export class UpdatedNoteDataDto {
  @Expose()
  readonly noteId: number;

  @Expose()
  readonly updatedAt: string;
}

export class UpdateNotesColorResDto {
  @Expose()
  @Type(() => UpdatedNoteDataDto) 
  readonly updatedNotesData: UpdatedNoteDataDto[];
}