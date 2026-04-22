import styles from './ModalHeader.module.scss';
import CrossIcon from '/src/assets/icons/cross.svg?react';

interface ModalHeaderProps {
  title: string,
  onClose: () => void 
}

const ModalHeader = ({ title, onClose}:ModalHeaderProps) => {
  return (
    <div className={styles.modalHeader}>
      <div className={styles.title}>{title}</div>
      <button className={styles.closeModalBtn} onClick={onClose} type='button'>
        <CrossIcon 
          style={{
            width: '35px',
            height: '35px',
            fill: 'white'
          }}
        />
      </button>
    </div>
  )
}
export default ModalHeader;