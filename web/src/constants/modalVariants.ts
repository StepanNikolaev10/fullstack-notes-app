import AddNoteModal from "../components/NotesPage/AddNoteModal/AddNoteModal";
import EditNoteColorModal from "../components/Shared/EditNoteColorModal/EditNoteColorModal";
import SelectSortModal from "../components/NotesPage/SelectSortModal/SelectSortModal";

export const MODAL_VARIANTS = {
  NOTE_ADDING: AddNoteModal,
  NOTE_COLOR_EDITING: EditNoteColorModal,
  SORT_SELECTING: SelectSortModal
} as const;

export type ModalVariantsKeysType = keyof typeof MODAL_VARIANTS;