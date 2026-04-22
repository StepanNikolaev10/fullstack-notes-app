import styles from './SelectedNotesCounter.module.scss';
import useSelectedNotesStore from '../../../../store/useSelectedNotesStore';

const SelectedNotesCounter = () => {
  const selectedNotesIds = useSelectedNotesStore(state => state.selectedNotesIds);
  return (
    <div className={styles.selectedNotesCounter}>
      Selected: {selectedNotesIds.length}
    </div>
  )
}

export default SelectedNotesCounter;