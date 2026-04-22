import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { Note } from '../types/entities';
import { type NoteColorsKeysType } from '../constants/noteColors';
import useSelectedNotesStore from './useSelectedNotesStore';
import type { NotesSortMethodsKeysType } from '../constants/notesSortMethods';
// Дописать методы сортировки для модального окна с сортировкой, продолжать внедлять NotesSelectedHeaderContent, доделать ArchivePage

interface NotesStore {
  notes: Note[];
  selectedSort: NotesSortMethodsKeysType;
  archivedNotes: Note[];
  trashedNotes: Note[];
  addNote: ({ title, mainText }: Note['content'] ) => void;
  deleteNotes: (ids: string[]) => void;
  changeNotesColor: (ids: string[], colorKey: NoteColorsKeysType) => void;
  updateNoteContent: (id: string, newContent: Note['content']) => void;
  changeNotePosition: (id: string, movementDirection: 'UP' | 'DOWN') => void;
  selectSort: (sortMethod: NotesSortMethodsKeysType) => void;
  archiveNotes: (ids: string[]) => void;
  unarchiveNotes: (ids: string[]) => void;
  updateArchivedNoteContent: (id: string, newContent: Note['content']) => void;
  changeArchivedNotesColor: (ids: string[], colorKey: NoteColorsKeysType) => void;
  deleteArchivedNotes: (ids: string[]) => void;
  deleteTrashedNotes: (ids: string[]) => void;
  deleteAllTrashedNotes: () => void;
  restoreTrashedNotes: (ids: string[]) => void;
}

const useNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      // СОСТОЯНИЯ
      notes: [],
      selectedSort: 'CUSTOM',
      archivedNotes: [],
      trashedNotes: [],
      // ДЕЙСТВИЯ
      addNote: ({ title, mainText }) => {
        const newNote: Note = {
          id: uuidv4(),
          dateCreated: Date.now(),
          dateModified: Date.now(), 
          content: {
            title: title,
            mainText: mainText
          },
          colorKey: 'UNCOLORED'
        }
        set(state => ({
          notes: [newNote, ...state.notes]
        }));
      },

      deleteNotes: (ids) => set(state => ({
        trashedNotes: [
          ...state.notes.filter((note) => ids.includes(note.id)),
          ...state.trashedNotes
        ],
        notes: state.notes.filter(note => !ids.includes(note.id))
      })),

      changeNotesColor: (ids, colorKey) => set(state => ({
        notes: state.notes.map(note => 
          ids.includes(note.id)
          ? { ...note, dateModified: Date.now(), colorKey: colorKey } 
          : note
        )
      })),
      
      updateNoteContent: (id, newContent) => set(state => ({
        notes: state.notes.map(note =>
          note.id === id 
          ? { ...note, dateModified: Date.now(), content: newContent }
          : note
        )
      })),

      changeNotePosition: (id, movementDirection) => {
        const currentNotes = get().notes;

        const currentIndex = currentNotes.findIndex(note => note.id === id);
        if (currentIndex === -1) return;

        let newIndex = currentIndex;
        if (movementDirection === 'UP') {
            newIndex = newIndex - 1;
        } else if (movementDirection === 'DOWN') {
            newIndex = newIndex + 1;
        }

        if (newIndex < 0 || newIndex >= currentNotes.length) {
            return; 
        }

        const newNotes = [...currentNotes];

        const noteToMove = newNotes[currentIndex];
        
        newNotes.splice(currentIndex, 1);
        newNotes.splice(newIndex, 0, noteToMove);
        
        set({
          notes: newNotes
        });
      },

      selectSort: (sortMethod) => {
        set({
          selectedSort: sortMethod
        })
      },

      archiveNotes: (ids) => {
        set(state => ({
          archivedNotes: [...state.notes.filter(note => ids.includes(note.id)), ...state.archivedNotes],
          notes: state.notes.filter(note => !ids.includes(note.id))
        }))
      }, 

      unarchiveNotes: (ids) => {
        set(state => ({
          notes: [...state.archivedNotes.filter(note => ids.includes(note.id)), ...state.notes],
          archivedNotes: [...state.archivedNotes.filter(note => !ids.includes(note.id))]
        }))
      },

      updateArchivedNoteContent: (id, newContent) => set(state => ({
        archivedNotes: state.archivedNotes.map(note =>
          note.id === id 
          ? { ...note, dateModified: Date.now(), content: newContent }
          : note
        )
      })),
      
      changeArchivedNotesColor: (ids, colorKey) => set(state => ({
        archivedNotes: state.archivedNotes.map(note => 
          ids.includes(note.id)
          ? { ...note, dateModified: Date.now(), colorKey: colorKey } 
          : note
        )
      })),

      deleteArchivedNotes: (ids) => set(state => ({
        trashedNotes: [
          ...state.archivedNotes.filter((note) => ids.includes(note.id)),
          ...state.trashedNotes
        ],
        archivedNotes: state.archivedNotes.filter(note => !ids.includes(note.id))
      })),
      
      deleteTrashedNotes: (ids) => {
        set(state => ({
          trashedNotes: state.trashedNotes.filter(note => !ids.includes(note.id))
        }))
        useSelectedNotesStore.getState().deselectByIds(ids)
      },

      deleteAllTrashedNotes: () => {
        set({
          trashedNotes: []
        })
        useSelectedNotesStore.getState().deselectAll();
      },

      restoreTrashedNotes: (ids) => {
        set(state => ({
          notes: [...state.trashedNotes.filter(note => ids.includes(note.id)), ...state.notes],
          trashedNotes: state.trashedNotes.filter(note => !ids.includes(note.id))
        }))
        useSelectedNotesStore.getState().deselectByIds(ids)
      }

    }),
    {
      name: 'notes',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useNotesStore;