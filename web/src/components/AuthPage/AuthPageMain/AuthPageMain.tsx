import AuthFormCard from '../AuthFormCard/AuthFormCard';
import styles from './AuthPageMain.module.scss';
import type { AuthPageVariants } from '../../../types/ui';

interface AuthPageMainProps {
  pageVariant: AuthPageVariants
}

const AuthPageMain = ({ pageVariant }: AuthPageMainProps) => {
    return (
      <main className={styles.authPageMain}>
        <AuthFormCard pageVariant={pageVariant}/>
      </main>
    )
}

export default AuthPageMain;