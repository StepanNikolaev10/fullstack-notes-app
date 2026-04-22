import styles from './NotesSearchPageHeader.module.scss';
import useSelectedNotesStore from '../../../store/useSelectedNotesStore';
import NotesSelectedHeaderContent from '../../Shared/NotesSelectedHeaderContent/NotesSelectedHeaderContent';
import DefaultContent from './DefaultContent/DefaultContent';

interface NotesSearchPageHeaderProps {
  searchQuery: string,
  onSetSearchQuery: React.Dispatch<React.SetStateAction<string>>,
}

const NotesSearchPageHeader = ({ searchQuery, onSetSearchQuery }:NotesSearchPageHeaderProps) => {
  const selectedNotesIds = useSelectedNotesStore(state => state.selectedNotesIds);

  return (
    <header className={styles.header}>
      {selectedNotesIds.length > 0 
      ? 
        (
          <NotesSelectedHeaderContent/>
        ) 
      : 
        (
          <DefaultContent 
            searchQuery={searchQuery}
            onSetSearchQuery={onSetSearchQuery}
          />
        )
      }
    </header>
  )
}
export default NotesSearchPageHeader;