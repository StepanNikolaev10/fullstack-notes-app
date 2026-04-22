import styles from './TrashPageMain.module.scss';
import NotesList from '../../Shared/NotesList/NotesList';
import useNotesStore from '../../../store/useNotesStore';

const TrashPageMain = () => {
  const trashedNotes = useNotesStore(state => state.trashedNotes);
  return (
    <main className={styles.main}>
      {trashedNotes.length > 0
        ? (
          <>
            <div className={styles.trashInfoMessage}>After 30 days in the Trash, this notes will be permanently deleted.</div>
            <NotesList notes={trashedNotes}/>
          </>
        ) : <div className={styles.noNotesMessage}>No notes in trash</div>
      }
    </main>
  )
}
export default TrashPageMain;