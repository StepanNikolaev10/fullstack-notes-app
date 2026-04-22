import { useLocation, useNavigate } from 'react-router-dom';
import styles from './SearchNotesBox.module.scss';
import SortIcon from '/src/assets/icons/sort-icon.svg?react';
import useModalStore from '../../../../../store/useModalStore';
import { NOTES_SECTIONS_PATHS } from '../../../../../constants/NotesSectionPaths';

const SearchNotesBox = () => {
  const router = useNavigate();
  const { pathname } = useLocation();

  const openModal = useModalStore(state => state.openModal);  

  const openSearchPage = () => {
    if (pathname.includes(NOTES_SECTIONS_PATHS.NOTES)) router(`${NOTES_SECTIONS_PATHS.NOTES}/search`);
    if (pathname.includes(NOTES_SECTIONS_PATHS.ARCHIVE)) router(`${NOTES_SECTIONS_PATHS.ARCHIVE}/search`);
  }

  const handleOpenSortModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    openModal('SORT_SELECTING')
  } 

  return (
    <div className={styles.searchNotesBox} onClick={openSearchPage}>
      <div className={styles.searchBoxText}>Search notes</div>
      <div className={styles.sortBtns}>
        <button className={styles.openSortModalBtn} onClick={(e) => handleOpenSortModal(e)}>
          <SortIcon 
            style={{
              width: '20px', 
              height: '20px',
              fill: 'rgb(218, 218, 218)'
            }}
          />
        </button>
      </div>
    </div>
  )
}
export default SearchNotesBox;