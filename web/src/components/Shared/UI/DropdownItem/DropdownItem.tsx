import styles from './DropdownItem.module.scss';

interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const DropdownItem = ({ children, ...props }: DropdownItemProps) => {
  return (
    <button className={styles.dropdownItem} {...props}>
      {children}
    </button>
  )
}
export default DropdownItem;