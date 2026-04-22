import styles from './LandingPageMain.module.scss';
import { Link } from 'react-router-dom';

const LandingPageMain = () => {
  return (
    <div className={styles.landingPageMain}>
      <div className={styles.content}>
        <h1>Stay organized with My Notes</h1>
        <p className={styles.subtitle}>
          Keep track of your tasks and ideas in one place
        </p>
        <Link to={'/sign-up'} className={styles.button}>
          Get started
        </Link>
      </div>
    </div>
  )
}
export default LandingPageMain;