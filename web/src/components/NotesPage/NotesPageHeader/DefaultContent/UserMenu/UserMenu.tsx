import { useState, useRef } from 'react';
import styles from './UserMenu.module.scss';
import { useClickOutside } from '../../../../../hooks/useClickOutside';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../../context/auth/useAuth';

const UserMenu = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useNavigate();
  const { setIsAuth } = useAuth();

  useClickOutside(menuRef, () => {
    if (isDropdownOpen) setDropdownOpen(false);
  });

  const logout = () => {
    localStorage.setItem('auth', 'false');
    setIsAuth(false);
    router(`/`);
  }

  return (
    <div className={styles.userMenu} ref={menuRef}>
      <button className={styles.userNameBtn} onClick={() => setDropdownOpen(!isDropdownOpen)}>username</button>
      {isDropdownOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.dropdownItem}>Settings</div>
          <div className={styles.dropdownItem} onClick={logout}>Log out</div>
        </div>
      )}
    </div>
  )
}
export default UserMenu;