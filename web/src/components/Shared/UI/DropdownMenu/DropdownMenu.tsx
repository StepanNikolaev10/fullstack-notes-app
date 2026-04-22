import styles from './DropdownMenu.module.scss';
import DropdownItem from '../DropdownItem/DropdownItem';

interface DropdownMenuProps {
  isOpen: boolean;
  children: React.ReactElement<typeof DropdownItem> | React.ReactElement<typeof DropdownItem>[];
}

const DropdownMenu = ({ isOpen, children }: DropdownMenuProps) => {
  return (
    <div className={`${styles.dropdownMenu} ${isOpen ? styles.opened : ''}`}>
      {children}
    </div>
  )
}
export default DropdownMenu;