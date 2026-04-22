import NotesSearchPageHeader from '../components/NotesSearchPage/NotesSearchPageHeader/NotesSearchPageHeader';
import NotesSearchPageMain from '../components/NotesSearchPage/NotesSearchPageMain/NotesSearchPageMain';
import { useState, useMemo } from 'react';
import useNotesStore from '../store/useNotesStore'
import EditNoteColorModal from '../components/Shared/EditNoteColorModal/EditNoteColorModal';
import useDebounce from '../hooks/useDebounce';
import PageWrapper from '../components/Shared/UI/PageWrapper/PageWrapper';
import useModalStore from '../store/useModalStore';
import { useLocation } from 'react-router-dom';
import { NOTES_SECTIONS_PATHS } from '../constants/NotesSectionPaths';

const NotesSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { pathname } = useLocation();

  const notes = useNotesStore(state => {
    if (pathname.includes(NOTES_SECTIONS_PATHS.ARCHIVE)) return state.archivedNotes;
    return state.notes;
  });
  const openedModal = useModalStore(state => state.openedModal);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const searchedNotes = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return [];
    return notes.filter((item) => {
      const title = item.content?.title?.toLowerCase() || '';
      const text = item.content?.mainText?.toLowerCase() || '';
      return title.includes(normalizedQuery) || text.includes(normalizedQuery);
    });
  }, [debouncedSearchQuery, notes])

  return (
    <PageWrapper>
      <NotesSearchPageHeader
        onSetSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      />
      <NotesSearchPageMain
        searchedNotes={searchedNotes}
      />
      {openedModal === 'NOTE_ADDING' && <EditNoteColorModal/>}

    </PageWrapper>
  )
}
export default NotesSearchPage;