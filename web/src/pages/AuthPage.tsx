import AuthPageMain from '../components/AuthPage/AuthPageMain/AuthPageMain';
import NotAuthPagesHeader from '../components/Shared/NotAuthPagesHeader/NotAuthPagesHeader';
import type { AuthPageVariants } from '../types/ui';
import PageWrapper from '../components/Shared/UI/PageWrapper/PageWrapper';

interface AuthPageProps {
  pageVariant: AuthPageVariants
}

const AuthPage = ({ pageVariant }: AuthPageProps) => {

  return (
    <PageWrapper>
      <NotAuthPagesHeader pageVariant={pageVariant}/>
      <AuthPageMain pageVariant={pageVariant}/>
    </PageWrapper>
  )
}
export default AuthPage;