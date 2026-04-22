import type { ComponentPropsWithoutRef } from 'react';
import styles from './CloseModalBtn.module.scss';

interface CloseModalBtnProps extends ComponentPropsWithoutRef<'button'> {}

const CloseModalBtn = ({ children, ...props }: CloseModalBtnProps) => {
  return (
    <button className={styles.closeModalBtn} {...props}>
      {children}
    </button>
  );
};

export default CloseModalBtn;