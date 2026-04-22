import styles from './DefaultContent.module.scss';
import { Link } from 'react-router-dom';

interface DefaultContentProps {
  searchQuery: string,
  onSetSearchQuery: React.Dispatch<React.SetStateAction<string>>,
}

const DefaultContent = ({ searchQuery, onSetSearchQuery }: DefaultContentProps) => {
  return (
    <div className={styles.defaultContent}>
      <Link className={styles.backBtn} to={'/'}>Back</Link>
      <input 
        value={searchQuery}
        onChange={(e) => onSetSearchQuery(e.target.value)}
        className={styles.searchInput}
        type="text" 
        placeholder='Search notes' 
        autoFocus
      />
    </div>
  )
}

export default DefaultContent;