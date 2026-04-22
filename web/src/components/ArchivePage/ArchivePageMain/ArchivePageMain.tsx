import styles from './ArchivePageMain.module.scss';
import NotesList from '../../Shared/NotesList/NotesList';
import useNotesStore from '../../../store/useNotesStore';

const ArchivePageMain = () => {
  const archivedNotes = useNotesStore(state => state.archivedNotes)
  return (
    <main className={styles.main}>
      {archivedNotes.length > 0
        ? <NotesList notes={archivedNotes}/>
        : <div className={styles.noNotesMessage}>No notes in archive</div>
      }
    </main>
  )
}
export default ArchivePageMain;