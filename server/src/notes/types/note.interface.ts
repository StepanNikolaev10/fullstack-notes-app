import type { NoteColorsKeys } from "./note-colors.interface";

export interface Note {
  readonly id: number;
  readonly title: string,
  readonly mainText: string
  readonly colorKey: NoteColorsKeys;
  readonly status: 'default' | 'archived' | 'trashed';
  readonly positionNumber: number;
  readonly createdAt: Date | string; // на клиент эти данные приходят строкой из за JSON.stringify
  readonly updatedAt: Date | string; // на клиент эти данные приходят строкой из за JSON.stringify
}