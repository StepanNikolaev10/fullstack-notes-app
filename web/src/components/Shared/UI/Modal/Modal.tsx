import type { ReactNode, MouseEvent } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div 
        className={styles.modal} 
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
