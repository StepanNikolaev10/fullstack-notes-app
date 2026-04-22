export const NOTES_SECTIONS_PATHS = {
  NOTES: '/notes',
  ARCHIVE: '/archive',
  TRASH: '/trash'
} as const;

export type notesSectionsPaths = keyof typeof NOTES_SECTIONS_PATHS;