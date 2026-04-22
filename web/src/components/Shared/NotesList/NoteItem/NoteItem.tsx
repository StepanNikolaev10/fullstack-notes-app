import styles from './NoteItem.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import useSelectedNotesStore from '../../../../store/useSelectedNotesStore';
import { NOTE_COLORS } from '../../../../constants/noteColors';
import type { Note } from '../../../../types/entities';
import { NOTES_SECTIONS_PATHS } from '../../../../constants/NotesSectionPaths';
import SelectIcon from '/src/assets/icons/select.svg?react';

interface NoteItemProps {
  id: Note['id'];
  content: Note['content'];
  colorKey: Note['colorKey'];
}

const NoteItem = ({ id, content, colorKey }: NoteItemProps) => {
  const selectedNotesIds = useSelectedNotesStore(state => state.selectedNotesIds);
  const toggleSelectNote = useSelectedNotesStore(state => state.toggleSelectNote);

  const router = useNavigate();
  const { pathname } = useLocation(); 
  
  const openNote = () => {
    if(pathname.includes(NOTES_SECTIONS_PATHS.ARCHIVE)) {
      router(`${NOTES_SECTIONS_PATHS}/${id}`);
    } else if(pathname.includes(NOTES_SECTIONS_PATHS.TRASH)) {
      router(`${NOTES_SECTIONS_PATHS.TRASH}/${id}`);
    } else {
      router(`${NOTES_SECTIONS_PATHS.NOTES}/${id}`);
    }
  }

  const rootStyles = [styles.noteItem]
  
  const isColorable = colorKey !== 'UNCOLORED';
  if(isColorable) {
    rootStyles.push(styles.colorable)
  }

  const isSelected = selectedNotesIds.some(editableNoteId => editableNoteId === id);
  if(isSelected) {
    rootStyles.push(styles.selected);
  }

  const addEditableNoteHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    toggleSelectNote(id)
  }

  return (
    <div 
      className={rootStyles.join(' ')} 
      style={{
        backgroundColor: NOTE_COLORS[colorKey],
      }}
      onClick={openNote}
    >

      <div className={styles.noteContent}>
        <div 
          className={styles.title}
          style={{
            marginBottom: content.title && content.mainText && '10px'
          }}
        >
          {content.title}
        </div>
        <div className={styles.mainText}>
          {parse(DOMPurify.sanitize(content.mainText))}
        </div>
      </div>

      <div className={styles.selectBtn} onClick={addEditableNoteHandler}>
        <SelectIcon/>
      </div>

    </div>
  );
};

export default NoteItem;