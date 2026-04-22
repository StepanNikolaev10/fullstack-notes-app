import styles from './Sidebar.module.scss';
import Backdrop from '../../Shared/UI/Backdrop/Backdrop';
import CrossIcon from '/src/assets/icons/cross.svg?react';
import { Link, useLocation } from 'react-router-dom';
import NotesIcon from '/src/assets/icons/notes.svg?react';
import ArchiveIcon from '/src/assets/icons/archive.svg?react';
import TrashIcon from '/src/assets/icons/trash-can.svg?react';
import useSidebarStore from '../../../store/useSidebarStore';
import { useEffect } from 'react';
import { NOTES_SECTIONS_PATHS } from '../../../constants/NotesSectionPaths';

const navItems = [
  { name: 'Notes', path: NOTES_SECTIONS_PATHS.NOTES, iconElement: NotesIcon },
  { name: 'Archive', path: NOTES_SECTIONS_PATHS.ARCHIVE, iconElement: ArchiveIcon },
  { name: 'Trash', path: NOTES_SECTIONS_PATHS.TRASH, iconElement: TrashIcon },
] as const;

const Sidebar = () => {
  const isSidebarOpened = useSidebarStore(state => state.isSidebarOpened);
  const closeSidebar = useSidebarStore(state => state.closeSidebar);
  const location = useLocation();

  useEffect(() => {
    if (isSidebarOpened) {
      closeSidebar();
    }
  }, [location.pathname])

  return (
    <Backdrop isOpen={isSidebarOpened} onClose={closeSidebar}>
      <div 
        className={`${styles.sidebar} ${isSidebarOpened ? styles.opened : ''}`}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div className={styles.appName}>My notes</div>
          <button className={styles.closeSideBarBtn} onClick={closeSidebar}>
            <CrossIcon
              style={{
                fill: 'rgb(230, 230, 230)'
              }}
            />
          </button>
        </div>
        <div className={styles.main}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li 
                key={item.path} 
                className={`${styles.navItem} ${
                  location.pathname === item.path ? styles.active : ''
                }`}
                >
                  <Link to={item.path} className={styles.navLink}>
                    <item.iconElement/>
                    <span>{item.name}</span>
                  </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Backdrop>
  )
}

export default Sidebar;