import styles from './TrashPageHeader.module.scss';
import useSelectedNotesStore from '../../../store/useSelectedNotesStore';
import DefaultContent from './DefaultContent/DefaultContent';
import NotesSelectedContent from './NotesSelectedContent/NotesSelectedContent';

const TrashPageHeader = () => {
  const selectedNotesIds = useSelectedNotesStore(state => state.selectedNotesIds);

  return (
    <header className={styles.header}>
      {selectedNotesIds.length > 0 
        ? <NotesSelectedContent/>
        : <DefaultContent/>
      }
    </header>
  )
}
export default TrashPageHeader;