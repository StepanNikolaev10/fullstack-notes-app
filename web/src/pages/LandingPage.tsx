import NotAuthPagesHeader from '../components/Shared/NotAuthPagesHeader/NotAuthPagesHeader';
import LandingPageMain from '../components/LandingPage/LandingPageMain/LandingPageMain';
import PageWrapper from '../components/Shared/UI/PageWrapper/PageWrapper';


const LandingPage = () => {
  return (
    <PageWrapper>
      <NotAuthPagesHeader/>
      <LandingPageMain/>
    </PageWrapper>
  );
};

export default LandingPage;