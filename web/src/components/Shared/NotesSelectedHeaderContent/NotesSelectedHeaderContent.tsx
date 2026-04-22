import styles from './NotesSelectedHeaderContent.module.scss';
import useSelectedNotesStore from '../../../store/useSelectedNotesStore';
import useNotesStore from '../../../store/useNotesStore';
import ArrowNarrowIcon from '/src/assets/icons/arrow-narrow-up.svg?react';
import PaletteIcon from '/src/assets/icons/palette.svg?react';
import CrossIcon from '/src/assets/icons/cross.svg?react';
import useModalStore from '../../../store/useModalStore';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useRef, useState } from 'react';
import DropdownMenu from '../UI/DropdownMenu/DropdownMenu';
import DropdownItem from '../UI/DropdownItem/DropdownItem';
import MoreIcon from '/src/assets/icons/more.svg?react';
import { useLocation } from 'react-router-dom';
import { NOTES_SECTIONS_PATHS } from '../../../constants/NotesSectionPaths';

const NotesSelectedHeaderContent = () => {
  const { pathname } = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef(null);

  const archiveNotes = useNotesStore(state => state.archiveNotes);
  const unarchiveNotes = useNotesStore(state => state.unarchiveNotes);
  const selectedNotesIds = useSelectedNotesStore(state => state.selectedNotesIds);
  const deleteNotes = useNotesStore(state => {
    if (pathname.includes(NOTES_SECTIONS_PATHS.ARCHIVE)) return state.deleteArchivedNotes;
    return state.deleteNotes;
  });
  const deselectAll = useSelectedNotesStore(state => state.deselectAll);
  const changeNotePosition = useNotesStore(state => state.changeNotePosition);
  const openModal = useModalStore(state => state.openModal);

  useClickOutside(menuRef, () => {
    if (isDropdownOpen) setIsDropdownOpen(false);
  });

  const deleteNotesHandler = () => {
    deleteNotes(selectedNotesIds);
    deselectAll();
  }

  const toggleNotesArchive = () => {
    pathname.includes(NOTES_SECTIONS_PATHS.ARCHIVE) ? unarchiveNotes(selectedNotesIds) : archiveNotes(selectedNotesIds);
    deselectAll();
  }

  const handleNoteUp = () => {
    if (selectedNotesIds.length === 1) {
      changeNotePosition(selectedNotesIds[0], 'UP');
    }
  }

  const handleNoteDown = () => {
    if (selectedNotesIds.length === 1) {
      changeNotePosition(selectedNotesIds[0], 'DOWN');
    }
  }

  return (
    <div className={styles.notesSelectedHeaderContent}>
      <div className={styles.sideSection}>
        <button className={styles.stopEditingBtn} onClick={deselectAll}>
          <CrossIcon
            style={{
              fill: 'rgb(218, 218, 218)'
            }}
          />
        </button>
        <div className={styles.selectedNotesCount}>Selected: {selectedNotesIds.length}</div>
      </div>
      <div className={styles.sideSection}>
        {pathname.includes(NOTES_SECTIONS_PATHS.NOTES) && 
          <>
            <button 
              className={`${styles.editNoteBtn} ${selectedNotesIds.length > 1 ? styles.inactive : ''}`} 
              onClick={handleNoteDown}
            >
              <ArrowNarrowIcon
                style={{
                  transform: 'scaleY(-1)',
                  stroke: 'rgb(218, 218, 218)'
                }}
              />
            </button>
            <button 
              className={`${styles.editNoteBtn} ${selectedNotesIds.length > 1 ? styles.inactive : ''}`} 
              onClick={handleNoteUp}
            >
              <ArrowNarrowIcon
                style={{
                  stroke: 'rgb(218, 218, 218)'
                }}
              />
            </button>
          </>
        }
        <button className={styles.editNoteBtn} onClick={() => openModal('NOTE_COLOR_EDITING')}>
          <PaletteIcon
            style={{
              fill: 'rgb(218, 218, 218)'
            }}
          />
        </button>
        <div className={styles.dropdownContainer} ref={menuRef}>
          <button className={styles.moreBtn} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <MoreIcon
              style={{fill: 'rgb(230, 230, 230)'}}
            />
          </button>
          <DropdownMenu isOpen={isDropdownOpen}>
            <DropdownItem onClick={toggleNotesArchive}>{pathname.includes(NOTES_SECTIONS_PATHS.NOTES) ? 'Archive': 'Unarchive'}</DropdownItem>
            <DropdownItem onClick={deleteNotesHandler}>Delete</DropdownItem>
          </DropdownMenu>
        </div>
        {/* <button className={styles.editNoteBtn} onClick={deleteNotesHandler}>
          <TrashCanIcon
            style={{
              fill: 'rgb(218, 218, 218)'
            }}
          />
        </button> */}
      </div>
    </div>
  )
}

export default NotesSelectedHeaderContent;