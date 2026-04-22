import type { ButtonHTMLAttributes } from 'react';
import styles from './NoteAddBtn.module.scss';

interface NoteAddBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const NoteAddBtn = (props:NoteAddBtnProps) => {
  return (
    <button className={styles.noteAddBtn} {...props}>
      <span></span>
    </button>
  );
};

export default NoteAddBtn;
