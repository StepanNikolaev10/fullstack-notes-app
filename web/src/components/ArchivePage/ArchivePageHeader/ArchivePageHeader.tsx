import styles from './ArchivePageHeader.module.scss';
import NotesSelectedHeaderContent from '../../Shared/NotesSelectedHeaderContent/NotesSelectedHeaderContent';
import useSelectedNotesStore from '../../../store/useSelectedNotesStore';
import DefaultContent from './DefaultContent/DefaultContent';

const ArchivePageHeader = () => {
  const selectedNotesIds = useSelectedNotesStore(state => state.selectedNotesIds);
  return (
    <div className={styles.header}>
      {selectedNotesIds.length > 0 
        ? <NotesSelectedHeaderContent/>
        : <DefaultContent/>
      }
    </div>
  )
}

export default ArchivePageHeader;