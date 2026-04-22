import { create } from 'zustand';
import type { ModalVariantsKeysType } from '../constants/modalVariants';

interface ModalStore {
  openedModal: ModalVariantsKeysType | null;
  openModal: (modalVariant: ModalVariantsKeysType) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>()(
  (set) => ({
    openedModal: null,
    openModal: (modalVariant) => {
      set({
        openedModal: modalVariant
      });
    },
    closeModal: () => {
      set({
        openedModal: null
      });
    }
  })
)

export default useModalStore;