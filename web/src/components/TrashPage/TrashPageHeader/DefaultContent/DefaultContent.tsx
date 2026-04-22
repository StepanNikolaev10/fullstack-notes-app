import { useRef, useState } from 'react';
import styles from './DefaultContent.module.scss';
import useSidebarStore from '../../../../store/useSidebarStore';
import useNotesStore from '../../../../store/useNotesStore';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import BurgerBtn from '../../../Shared/UI/BurgerBtn/BurgerBtn';
import MoreIcon from '/src/assets/icons/more.svg?react';
import DropdownMenu from '../../../Shared/UI/DropdownMenu/DropdownMenu';
import DropdownItem from '../../../Shared/UI/DropdownItem/DropdownItem';

const DefaultContent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleSidebar = useSidebarStore(state => state.toggleSidebar);
  const trashedNotes = useNotesStore(state => state.trashedNotes);
  const deleteAllTrashedNotes = useNotesStore(state => state.deleteAllTrashedNotes);

  useClickOutside(menuRef, () => {
    if (isDropdownOpen) setIsDropdownOpen(false);
  });

  const deleteAllTrashedNotesHandler = () => {
    deleteAllTrashedNotes();
    setIsDropdownOpen(false);
  }

  return (
    <div className={styles.defaultContent}>
      <div className={styles.sideSection}>
        <BurgerBtn onClick={toggleSidebar}/>
        <div className={styles.pageName}>Trash</div>
      </div>
      <div className={styles.sideSection}>
        {trashedNotes.length > 0 && (
          <div className={styles.dropdownContainer} ref={menuRef}>
            <button className={styles.moreBtn} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <MoreIcon
                style={{fill: 'rgb(230, 230, 230)'}}
              />
            </button>
            <DropdownMenu isOpen={isDropdownOpen}>
              <DropdownItem onClick={deleteAllTrashedNotesHandler}>Empty trash</DropdownItem>
            </DropdownMenu>
          </div>
        )}

      </div>
    </div>
  )
}
export default DefaultContent;