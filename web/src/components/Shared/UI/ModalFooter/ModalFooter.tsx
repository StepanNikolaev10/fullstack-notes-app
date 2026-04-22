import styles from './ModalFooter.module.scss';
import type { ReactNode } from 'react';

interface ModalFooterProps {
  children: ReactNode;
}

const ModalFooter = ({ children }:ModalFooterProps) => {
  return (
    <div className={styles.modalFooter}>
      {children}
    </div>
  )
}
export default ModalFooter;