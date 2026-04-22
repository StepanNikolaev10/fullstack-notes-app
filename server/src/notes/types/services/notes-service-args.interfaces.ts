import type { Note } from "../note.interface";
import type { NoteColorsKeys } from "../note-colors.interface";
import type { User } from "src/users/types/user.interface";

type NoteIds = readonly Note['id'][];

export interface AddNoteArgs {
  readonly title: Note['title'];
  readonly mainText: Note['mainText'];
  readonly authorId: User['id'];
}

export interface ArchiveNotesArgs {
  readonly noteIds: NoteIds;
  readonly authorId: User['id'];
}

export interface UnarchiveNotesArgs {
  readonly noteIds: NoteIds;
  readonly authorId: User['id'];
}

export interface TrashNotesArgs {
  readonly noteIds: NoteIds;
  readonly authorId: User['id'];
}

export interface RestoreTrashedNotesArgs {
  readonly noteIds: NoteIds;
  readonly authorId: User['id'];
}

export interface DeleteNotesArgs {
  readonly noteIds: NoteIds;
  readonly authorId: User['id'];
}

export interface UpdateNotesColorArgs {
  readonly noteIds: NoteIds;
  readonly updatedColorKey: NoteColorsKeys;
  readonly authorId: User['id'];
}

export interface UpdateNoteContentArgs {
  readonly noteId: Note['id'];
  readonly updatedTitle: Note['title'];
  readonly updatedMainText: Note['mainText'];
  readonly authorId: User['id'];
}

export interface UpdateNotePositionArgs {
  readonly noteId: Note['id'];
  readonly updatedPositionNumber: Note['positionNumber']
  readonly authorId: User['id'];
}
