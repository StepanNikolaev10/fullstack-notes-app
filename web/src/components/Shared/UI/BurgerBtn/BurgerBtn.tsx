import styles from './BurgerBtn.module.scss';
import BurgerIcon from '/src/assets/icons/burger.svg?react';

const BurgerBtn = ({ ...props }) => {
  return (
    <button className={styles.burgerBtn} {...props}>
      <BurgerIcon
        style={{
          stroke: 'rgb(220, 220, 220)'
        }}
      />
    </button>
  )
}
export default BurgerBtn;