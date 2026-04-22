import styles from './NotesSearchPageMain.module.scss';
import type { Note } from '../../../types/entities';
import NotesList from '../../Shared/NotesList/NotesList';

interface NotesSearchPageMainProps {
  searchedNotes: Note[],
}

const NotesSearchPageMain = ({ searchedNotes }: NotesSearchPageMainProps) => {
  return (
    <main className={styles.main}>
      {searchedNotes.length > 0 
        ? <NotesList notes={searchedNotes}/>
        : <div className={styles.noNotesMessage}>No notes found</div>
      }
    </main>
  )
}
export default NotesSearchPageMain;