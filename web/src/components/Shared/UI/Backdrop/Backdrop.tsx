import styles from './Backdrop.module.scss';

interface BackdropProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Backdrop = ({isOpen, onClose, children}: BackdropProps) => {
  return (
    <div className={`${styles.backdrop} ${isOpen ? styles.visible : ''}`} onClick={onClose}>
      {children}
    </div>
  )
}
export default Backdrop;