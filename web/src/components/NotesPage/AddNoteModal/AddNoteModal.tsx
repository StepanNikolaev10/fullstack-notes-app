import { useState } from 'react';
import useNotesStore from '../../../store/useNotesStore';
import Modal from '../../Shared/UI/Modal/Modal';
import CloseModalBtn from '../../Shared/UI/CloseModalBtn/CloseModalBtn';
import ConfirmModalBtn from '../../Shared/UI/ConfirmModalBtn/ConfirmModalBtn';
import ModalFooter from '../../Shared/UI/ModalFooter/ModalFooter';
import ModalHeader from '../../Shared/UI/ModalHeader/ModalHeader';
import styles from './AddNoteModal.module.scss';
import useModalStore from '../../../store/useModalStore';

const AddNoteModal = () => {
  const [title, setTitle] = useState('');
  const [mainText, setMainText] = useState('');

  const addNote = useNotesStore(state => state.addNote);
  const closeModal = useModalStore(state => state.closeModal);

  const addNoteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addNote({ title, mainText })
    closeModal();
    setTitle('')
    setMainText('')
  }

  return (
    <Modal onClose={closeModal}>
      <form className={styles.modalContent}>
        <ModalHeader title={'Add note'} onClose={closeModal}/>
        <div className={styles.modalMain}>
          <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              type="text" 
              placeholder="Title..."
              autoFocus
          />
          <input
              value={mainText}
              onChange={e => setMainText(e.target.value)}
              type="text" 
              placeholder="Note text..."
          />
        </div>
        <ModalFooter>
          <CloseModalBtn onClick={closeModal} type='button'>Cancel</CloseModalBtn>
          <ConfirmModalBtn onClick={addNoteHandler} type='submit'>Add</ConfirmModalBtn>
        </ModalFooter>
      </form>
    </Modal>
  )
}
export default AddNoteModal;