import styles from './NotesList.module.scss';
import type { Note } from '../../../types/entities';
import NoteItem from './NoteItem/NoteItem';

interface NotesListProps {
  notes: Note[];
}

const NotesList = ({ notes }: NotesListProps) => {
  return (
    <div className={styles.notesList}>
      {
        notes.map((note) => {
          return (
            <NoteItem
              key={note.id}
              id={note.id}
              content={note.content}
              colorKey={note.colorKey}
            />
          );
        })
      }
    </div>
  )
}
export default NotesList;