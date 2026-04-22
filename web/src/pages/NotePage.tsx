import NotePageHeader from '../components/NotePage/NotePageHeader/NotePageHeader';
import NotePageMain from '../components/NotePage/NotePageMain/NotePageMain';
import { useEffect, useState } from 'react';
import useNotesStore from '../store/useNotesStore';
import { NOTE_COLORS } from '../constants/noteColors';
import type { NoteColorsKeysType } from '../constants/noteColors';
import PageWrapper from '../components/Shared/UI/PageWrapper/PageWrapper';
import { useLocation, useParams } from 'react-router-dom';
import { NOTES_SECTIONS_PATHS } from '../constants/NotesSectionPaths';

const NotePage = () => {
  const { id } = useParams();
  if (!id) return <div>Note not found</div>;
  const { pathname } = useLocation()
  const [title, setTitle] = useState('');
  const [mainText, setMainText] = useState('');
  const [noteColor, setNoteColor] = useState<NoteColorsKeysType>('UNCOLORED');

  const notes = useNotesStore(state => {
    if (pathname.includes(NOTES_SECTIONS_PATHS.ARCHIVE)) return state.archivedNotes;
    if (pathname.includes(NOTES_SECTIONS_PATHS.TRASH)) return state.trashedNotes;
    return state.notes;
  });
  const updateNoteContent = useNotesStore(state => {
    if (pathname.includes(NOTES_SECTIONS_PATHS.ARCHIVE)) return state.updateArchivedNoteContent;
    return state.updateNoteContent;
  });

  useEffect(() => {
    const foundNote = notes.find(item => item.id === id);
    if (!foundNote) return;
    setTitle(foundNote.content.title || '');
    setMainText(foundNote.content.mainText || '');
    setNoteColor(foundNote.colorKey);
    
  }, []);
  return (
    <PageWrapper style={{backgroundColor: NOTE_COLORS[noteColor]}}>
      <NotePageHeader
        onSaveNote={() => updateNoteContent(id, {title, mainText})}
      />
      <NotePageMain
        title={title}
        mainText={mainText}
        onSetTitle={setTitle}
        onSetMainText={setMainText}
      />

    </PageWrapper>
  )
}

export default NotePage;