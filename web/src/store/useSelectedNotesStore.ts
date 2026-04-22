import { create } from 'zustand';

interface SelectedNotesStore {
  selectedNotesIds: string[];
  toggleSelectNote: (id: string) => void;
  deselectAll: () => void;
  deselectByIds: (ids: string[]) => void;
}

const useSelectedNotesStore = create<SelectedNotesStore>()(
  (set, get) => ({
    // СОСТОЯНИЯ
    selectedNotesIds: [],
    // ДЕЙСТВИЯ
    toggleSelectNote: (id) => {
      const isAlreadySelected = get(). selectedNotesIds.includes(id)
      isAlreadySelected 
        ?
          set(state => ({
            selectedNotesIds: state.selectedNotesIds.filter(selectedNoteId => selectedNoteId !== id)
          }))
        :
          set(state => ({
            selectedNotesIds: [...state.selectedNotesIds, id]
          }))

    },
    deselectAll: () => {
      set({
        selectedNotesIds: []
      });
    },
    deselectByIds: (ids) => {
      if (!ids || ids.length === 0) return;
      set(state => ({
        selectedNotesIds: state.selectedNotesIds.filter(id => !ids.includes(id))
      }));
    }
  })
);

export default useSelectedNotesStore;