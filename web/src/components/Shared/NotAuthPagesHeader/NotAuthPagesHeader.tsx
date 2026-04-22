import AppName from '../UI/AppName/AppName';
import styles from './NotAuthPagesHeader.module.scss';
import { Link } from 'react-router-dom';
import type { AuthPageVariants } from '../../../types/ui';

interface NotAuthPagesHeaderProps {
  pageVariant?: AuthPageVariants
}

const NotAuthPagesHeader = ({ pageVariant }: NotAuthPagesHeaderProps) => {
  return (
    <header className={styles.header}>
      <AppName/>
      <nav className={styles.authLinks}>
        <Link to="/sign-in" className={`${styles.link} ${pageVariant === 'SIGN_IN' ? styles.opened : ''}`}>
          Login
        </Link>
        <Link to="/sign-up" className={`${styles.link} ${pageVariant === 'SIGN_UP' ? styles.opened : ''}`}>
          Sign up
        </Link>
      </nav>
    </header>
  )
}
export default NotAuthPagesHeader;