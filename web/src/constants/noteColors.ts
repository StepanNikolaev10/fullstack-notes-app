export const NOTE_COLORS = {
  UNCOLORED: 'transparent',
  FIRST:'rgba(169, 29, 36, 1)',
  SECOND: 'rgba(208, 112, 43, 1)',
  THIRD: 'rgba(182, 122, 12, 1)',
  FOURTH: 'rgba(6, 127, 46, 1)',
  FIFTH: 'rgba(40, 139, 99, 1)',
  SIXTH: 'rgba(94, 136, 170, 1)',
  SEVENTH: 'rgba(34, 74, 107, 1)',
  EIGHTH: 'rgba(107, 44, 93, 1)',
  NINETH: 'rgba(172, 97, 122, 1)',
  TENTH: 'rgba(126, 97, 55, 1)',
  ELEVENTH: 'rgba(49, 48, 48, 1)'
} as const; 

export type NoteColorsKeysType = keyof typeof NOTE_COLORS;

export const noteColorsKeys = Object.keys(NOTE_COLORS) as NoteColorsKeysType[];