import Modal from '../../Shared/UI/Modal/Modal';
import ModalHeader from '../../Shared/UI/ModalHeader/ModalHeader';
import styles from './SelectSortModal.module.scss';
import { notesSortMethodsList } from '../../../constants/notesSortMethods';
import CheckmarkIcon from '/src/assets/icons/checkmark.svg?react';
import useModalStore from '../../../store/useModalStore';
import useNotesStore from '../../../store/useNotesStore';

const SelectSortModal = () => {
  const selectedSort = useNotesStore(state => state.selectedSort);
  const selectSort = useNotesStore(state => state.selectSort);
  const closeModal = useModalStore(state => state.closeModal);

  return (
    <Modal onClose={closeModal}>
      <div className={styles.modalContent}>
        <ModalHeader title={'Sort by'} onClose={closeModal}/>
        <div className={styles.modalMain}>
          <div className={styles.sortMethods}>
            {notesSortMethodsList.map(method => (
              <div 
                key={method.value}
                className={`${styles.sortMethod} ${selectedSort === method.value ? styles.active : ''}`}
                onClick={() => selectSort(method.value)}
              >
                <div className={styles.checkmarkBox}>
                  {selectedSort === method.value && (
                    <CheckmarkIcon
                      style={{
                        width: '35px',
                        height: '35px',
                        fill: 'black'
                      }}
                    />
                  )}
                </div>
                <div className={styles.sortMethodLabel}>{method.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default SelectSortModal;
