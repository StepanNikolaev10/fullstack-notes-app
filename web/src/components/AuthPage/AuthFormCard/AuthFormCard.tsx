import styles from './AuthFormCard.module.scss';
import AuthForm from '../AuthForm/AuthForm';
import type { AuthPageVariants } from '../../../types/ui';

interface AuthFormCardProps {
  pageVariant: AuthPageVariants
}

const AuthFormCard = ({ pageVariant }: AuthFormCardProps) => {
  return (
    <div className={styles.authFormCard}>
      {pageVariant === 'SIGN_IN' && (
        <>
          <h2>Welcome back!</h2>
          <p className={styles.subText}>Sign in to your account</p>
          <AuthForm pageVariant={pageVariant}/>
          <div className={styles.linkText}>
            Don't have an account? <a href="#" className={styles.bottomLink}>Sign up</a>
          </div>
        </>
      )}
      {pageVariant === 'SIGN_UP' && (
        <>
          <h2>Create account</h2>
          <p className={styles.subText}>Sign up to get started</p>
          <AuthForm pageVariant={pageVariant}/>
          <div className={styles.linkText}>
            Already have an account? <a href="#" className={styles.bottomLink}>Log in</a>
          </div> 
        </>
      )}
    </div>
  )
}
export default AuthFormCard;