import styles from './AppName.module.scss'
import { Link } from 'react-router-dom';

const AppName = () => {
  return (
    <Link className={styles.AppName} to={'/'}>My notes</Link>
  )
}
export default AppName