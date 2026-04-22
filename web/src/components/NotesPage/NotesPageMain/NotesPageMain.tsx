import styles from "./NotesPageMain.module.scss";
import NoteAddBtn from "../UI/NoteAddBtn/NoteAddBtn";
import type { Note } from "../../../types/entities";
import NotesList from "../../Shared/NotesList/NotesList";
import useModalStore from "../../../store/useModalStore";

interface NotesPageMainProps {
  notes: Note[]; 
}

const NotesPageMain = ({ notes }:NotesPageMainProps) => {
  const openModal = useModalStore(state => state.openModal);

  return (
    <main className={styles.main}>

      {notes.length > 0 
        ? (
          <>
            <NotesList notes={notes}/>
          </>
        ) : <div className={styles.noNotesMessage}>No notes found</div>
      }
      <NoteAddBtn onClick={() => openModal('NOTE_ADDING')}/>
        
    </main>
  );
};

export default NotesPageMain;
