import { useNavigate } from 'react-router-dom';
import type { AuthPageVariants } from '../../../types/ui';
import styles from './AuthForm.module.scss';
import { useAuth } from '../../../context/auth/useAuth';

interface AuthFormProps {
  pageVariant: AuthPageVariants
}

const AuthForm = ({ pageVariant }: AuthFormProps) => {
  const router = useNavigate();
  const { setIsAuth } = useAuth();

  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.setItem('auth', 'true');
    setIsAuth(true);
    router(`/`);
  }

  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.setItem('auth', 'true');
    setIsAuth(true);
    router(`/`);
  }

  return (
    <form className={styles.authForm}>
      {pageVariant === 'SIGN_IN' && (
        <>
          <input type="email" placeholder="Email address" className={styles.inputField} />
          <input type="password" placeholder="Password" className={styles.inputField} />
          <button 
            type="submit" 
            className={styles.button}
            onClick={(e) => handleSignIn(e)}
          >
            Sign In
          </button>
          <a href="#" className={styles.forgotPassword}>
            Forgot password
          </a>
        </>
      )}
      {pageVariant === 'SIGN_UP' && (
        <>
          <input type="email" placeholder="Email address" className={styles.inputField} />
          <input type="password" placeholder="Password" className={styles.inputField} />
          <button 
            type="submit" 
            className={styles.button}
            onClick={(e) => handleSignUp(e)}
          >
            Sign up
          </button>
        </>
      )}
    </form>
  )
}
export default AuthForm;