import type { NoteColorsKeys } from "../types/note-colors.interface";

export class NoteDto {
  readonly id: number;
  readonly title: string;
  readonly mainText: string;
  readonly colorKey: NoteColorsKeys;
  readonly status: 'default' | 'archived' | 'trashed';
  readonly positionNumber: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}