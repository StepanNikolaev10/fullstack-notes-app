import { useState } from 'react';
import CloseModalBtn from '../UI/CloseModalBtn/CloseModalBtn';
import ConfirmModalBtn from '../UI/ConfirmModalBtn/ConfirmModalBtn';
import ModalFooter from '../UI/ModalFooter/ModalFooter';
import ModalHeader from '../UI/ModalHeader/ModalHeader';
import styles from './EditNoteColorModal.module.scss';
import useNotesStore from '../../../store/useNotesStore';
import useSelectedNotesStore from '../../../store/useSelectedNotesStore';
import Modal from '../UI/Modal/Modal';
import { NOTE_COLORS, noteColorsKeys, type NoteColorsKeysType } from '../../../constants/noteColors';
import CheckmarkIcon from '/src/assets/icons/checkmark.svg?react'
import useModalStore from '../../../store/useModalStore';
import { useLocation } from 'react-router-dom';
import { NOTES_SECTIONS_PATHS } from '../../../constants/NotesSectionPaths';

const EditNoteColorModal = () => {
  const [selectedColorKey, setSelectedColorKey] = useState<NoteColorsKeysType | null>(null);
  const { pathname } = useLocation();

  const selectedNotesIds = useSelectedNotesStore(state => state.selectedNotesIds);
  const deselectAll = useSelectedNotesStore(state => state.deselectAll);
  const changeNotesColor = useNotesStore(state => {
    if (pathname.includes(NOTES_SECTIONS_PATHS.ARCHIVE)) return state.changeArchivedNotesColor;
    return state.changeNotesColor;
  });
  const closeModal = useModalStore(state => state.closeModal)

  const handleColorBtnClick = (colorKey: NoteColorsKeysType) => {
    setSelectedColorKey(colorKey);
  }

  const handleChangeNotesColor = () => {
    if (!selectedColorKey) return;
    changeNotesColor(selectedNotesIds, selectedColorKey)
    closeModal();
    deselectAll();
  }
  return (
    <Modal onClose={closeModal}>
      <div className={styles.modalContent}>
        <ModalHeader title={'Change note color'} onClose={closeModal}/>
        <div className={styles.content}>
          {
            noteColorsKeys.map((colorKey: NoteColorsKeysType) => {
              const isSelected = selectedColorKey === colorKey;
              return (
                <button
                  key={colorKey} 
                  className={`${styles.colorBtn} ${isSelected ? styles.selectedColorBtn : ''}`}
                  style={{ backgroundColor:  NOTE_COLORS[colorKey]}}
                  onClick={() => handleColorBtnClick(colorKey)}
                >
                  {isSelected && 
                    <CheckmarkIcon
                      className={styles.checkmarkIcon}
                      style={{
                        width: '30px',
                        height: '30px',
                      }}
                    />
                  }
                </button>
              )
            })
          }
        </div>
        <ModalFooter>
          <CloseModalBtn onClick={closeModal} type='button'>Cancel</CloseModalBtn>
          <ConfirmModalBtn onClick={handleChangeNotesColor}>Confirm</ConfirmModalBtn>
        </ModalFooter>
      </div>
    </Modal>
  )
}

export default EditNoteColorModal;