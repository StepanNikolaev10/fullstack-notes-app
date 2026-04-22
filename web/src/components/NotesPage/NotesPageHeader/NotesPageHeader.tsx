import styles from './NotesPageHeader.module.scss';
import DefaultContent from './DefaultContent/DefaultContent';
import NotesSelectedHeaderContent from '../../Shared/NotesSelectedHeaderContent/NotesSelectedHeaderContent';
import useSelectedNotesStore from '../../../store/useSelectedNotesStore';

const NotesPageHeader = () => {;
  const selectedNotesIds = useSelectedNotesStore(state => state.selectedNotesIds);

  return (
    <header className={styles.header}>
      {selectedNotesIds.length > 0 
        ? <NotesSelectedHeaderContent/>
        : <DefaultContent/>
      }
    </header>
  )
}

export default NotesPageHeader;
