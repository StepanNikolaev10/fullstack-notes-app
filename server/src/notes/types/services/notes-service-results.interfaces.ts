import type { Note } from "../note.interface";

export interface AddNoteResult {
  readonly createdAt: Note['createdAt'];
  readonly updatedAt: Note['updatedAt'];
}

export interface UpdateNotesColorResult {
  readonly updatedNotesData: {
    readonly noteId: Note['id'];
    readonly updatedAt: Note['updatedAt'];
  }[]
}

export interface UpdateNoteContentResult {
  readonly updatedAt: Note['updatedAt'];
}

export interface GetNotesResult{
  readonly notes: Note[];
}
