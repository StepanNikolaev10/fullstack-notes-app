import { Expose } from "class-transformer";
import { NoteDto } from "../note.dto";

export class GetNotesResDto {
  @Expose()
  readonly notes: NoteDto[]
}