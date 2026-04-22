import PageWrapper from "../components/Shared/UI/PageWrapper/PageWrapper";
import ArchivePageHeader from "../components/ArchivePage/ArchivePageHeader/ArchivePageHeader";
import Sidebar from "../components/Shared/Sidebar/Sidebar";
import ArchivePageMain from "../components/ArchivePage/ArchivePageMain/ArchivePageMain";
import EditNoteColorModal from "../components/Shared/EditNoteColorModal/EditNoteColorModal";
import useModalStore from "../store/useModalStore";

const ArchivePage = () => {
  const openedModal = useModalStore(state => state.openedModal)
  return (
    <PageWrapper>
      <ArchivePageHeader/>
      <Sidebar/>
      <ArchivePageMain/>
      {openedModal === 'NOTE_COLOR_EDITING' && <EditNoteColorModal/>}
    </PageWrapper>
  )
}

export default ArchivePage;