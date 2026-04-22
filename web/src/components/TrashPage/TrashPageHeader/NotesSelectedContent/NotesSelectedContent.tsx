import styles from './NotesSelectedContent.module.scss';
import SelectedNotesCounter from '../../../Shared/UI/SelectedNotesCounter/SelectedNotesCounter';
import CrossIcon from '/src/assets/icons/cross.svg?react';
import useSelectedNotesStore from '../../../../store/useSelectedNotesStore';
import RestoreIcon from '/src/assets/icons/restore.svg?react';
import useNotesStore from '../../../../store/useNotesStore';
import MoreIcon from '/src/assets/icons/more.svg?react';
import { useRef, useState } from 'react';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import DropdownMenu from '../../../Shared/UI/DropdownMenu/DropdownMenu';
import DropdownItem from '../../../Shared/UI/DropdownItem/DropdownItem';

const NotesSelectedContent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const selectedNotesIds = useSelectedNotesStore(state => state.selectedNotesIds);
  const deselectAll = useSelectedNotesStore(state => state.deselectAll);
  const restoreTrashedNotes = useNotesStore(state => state.restoreTrashedNotes);
  const deleteTrashedNotes = useNotesStore(state => state.deleteTrashedNotes)

  useClickOutside(menuRef, () => {
    if (isDropdownOpen) setIsDropdownOpen(false);
  });

  return (
    <div className={styles.notesSelectedContent}>
      <div className={styles.sideSection}>
        <button className={styles.stopSelectingBtn} onClick={deselectAll}>
          <CrossIcon
            style={{
              fill: 'rgb(218, 218, 218)'
            }}
          />
        </button>
        <SelectedNotesCounter/>
      </div>
      <div className={styles.sideSection}>
        <button className={styles.restoreNoteBtn} onClick={() => restoreTrashedNotes(selectedNotesIds)}>
          <RestoreIcon
            style={{fill: 'rgb(230, 230, 230)'}}
          />
        </button>
        <div className={styles.dropdownContainer} ref={menuRef}>
          <button className={styles.moreBtn} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <MoreIcon
              style={{fill: 'rgb(230, 230, 230)'}}
            />
          </button> 
          <DropdownMenu isOpen={isDropdownOpen}>
            <DropdownItem onClick={() => deleteTrashedNotes(selectedNotesIds)}>Delete forever</DropdownItem>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default NotesSelectedContent;