import type { ComponentPropsWithoutRef } from 'react';
import styles from './ConfirmModalBtn.module.scss';

interface ConfirmModalBtnProps extends ComponentPropsWithoutRef<'button'> {}

const ConfirmModalBtn = ({children, ...props}:ConfirmModalBtnProps) => {
  return (
    <button className={styles.confirmModalBtn} {...props}>
      {children}
    </button>
  )
}
export default ConfirmModalBtn;