import { useRef, useState } from 'react';
import styles from './DefaultContent.module.scss';
import useSidebarStore from '../../../../store/useSidebarStore';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import BurgerBtn from '../../../Shared/UI/BurgerBtn/BurgerBtn';

const DefaultContent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleSidebar = useSidebarStore(state => state.toggleSidebar);

  useClickOutside(menuRef, () => {
    if (isDropdownOpen) setIsDropdownOpen(false);
  });

  return (
    <div className={styles.defaultContent}>
      <div className={styles.sideSection}>
        <BurgerBtn onClick={toggleSidebar}/>
        <div className={styles.pageName}>Archive</div>
      </div>
      <div className={styles.sideSection}>

      </div>
    </div>
  )
}
export default DefaultContent;