import NotesPageMain from '../components/NotesPage/NotesPageMain/NotesPageMain';
import NotesPageHeader from '../components/NotesPage/NotesPageHeader/NotesPageHeader';
import useNotesStore from '../store/useNotesStore';
import Sidebar from '../components/Shared/Sidebar/Sidebar';
import PageWrapper from '../components/Shared/UI/PageWrapper/PageWrapper';
import { MODAL_VARIANTS } from '../constants/modalVariants';
import useModalStore from '../store/useModalStore';
import { useMemo } from 'react';
import { NOTES_SORT_METHODS } from '../constants/notesSortMethods';

const NotesPage = () => {
  const notes = useNotesStore(state => state.notes);
  const selectedSort = useNotesStore(state => state.selectedSort);
  const openedModal = useModalStore(state => state.openedModal);
  const ModalEl = openedModal ? MODAL_VARIANTS[openedModal] : null;
  
  const sortedNotes = useMemo(() => {
    if (selectedSort === NOTES_SORT_METHODS.CUSTOM.value) {
      return notes;
    }

    if (selectedSort === NOTES_SORT_METHODS.DATE_CREATED.value) {
      return [...notes].sort((a,b) => b.dateCreated - a.dateCreated);
    }

    if (selectedSort === NOTES_SORT_METHODS.DATE_MODIFIED.value) {
      return [...notes].sort((a,b) => b.dateModified - a.dateModified);
    }

    return notes;
  }, [selectedSort, notes]);

  return (
    <PageWrapper>
      <NotesPageHeader/>
      <Sidebar/>
      <NotesPageMain
        notes={sortedNotes} 
      />
    {ModalEl && <ModalEl/>}
    </PageWrapper>
  );
  
}

export default NotesPage;