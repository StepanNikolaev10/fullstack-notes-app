import styles from './NotePageHeader.module.scss';
import { useNavigate } from 'react-router-dom';

interface NotePageHeaderProps {
  onSaveNote: () => void;
}

const NotePageHeader: React.FC<NotePageHeaderProps> = ({ onSaveNote }) => {
  const router = useNavigate();

  const saveNote = () => {
    onSaveNote();
    router('/');
  }

  return (
    <header className={styles.header}>
      <button className={styles.headerBtn} onClick={() => router('/')}>Back</button>
      <button className={styles.headerBtn} onClick={saveNote}>Save</button>
    </header>
  )
}
export default NotePageHeader;