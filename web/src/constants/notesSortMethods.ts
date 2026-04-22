export const NOTES_SORT_METHODS = {
  CUSTOM: { value: 'CUSTOM', label: 'Custom' },
  DATE_CREATED: { value: 'DATE_CREATED', label: 'Date created' },
  DATE_MODIFIED: { value: 'DATE_MODIFIED', label: 'Date modified' }
} as const

export type NotesSortMethodsKeysType = keyof typeof NOTES_SORT_METHODS;

export const notesSortMethodsList = Object.values(NOTES_SORT_METHODS);