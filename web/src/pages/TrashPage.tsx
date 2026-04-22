import Sidebar from '../components/Shared/Sidebar/Sidebar';
import TrashPageHeader from '../components/TrashPage/TrashPageHeader/TrashPageHeader';
import TrashPageMain from '../components/TrashPage/TrashPageMain/TrashPageMain';
import PageWrapper from '../components/Shared/UI/PageWrapper/PageWrapper';

const TrashPage = () => {
  return (
    <PageWrapper>
      <TrashPageHeader/>
      <Sidebar/>
      <TrashPageMain/>
    </PageWrapper>
  )
}
export default TrashPage;