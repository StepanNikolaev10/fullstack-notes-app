import AppName from '../../../Shared/UI/AppName/AppName';
import styles from './DefaultContent.module.scss';
import UserMenu from './UserMenu/UserMenu';
import SearchNotesBox from './SearchNotesBox/SearchNotesBox';
import BurgerBtn from '../../../Shared/UI/BurgerBtn/BurgerBtn';
import useSidebarStore from '../../../../store/useSidebarStore';

const DefaultContent = () => {
  const toggleSidebar = useSidebarStore(state => state.toggleSidebar)

  return (
    <div className={styles.defaultContent}>
      <div className={styles.startContainer}>
        <BurgerBtn onClick={toggleSidebar}/>
        <AppName/>
      </div>
      <div className={styles.centerContainer}>
      <SearchNotesBox/>
      </div>

      <div className={styles.endContainer}>
        <UserMenu/>
      </div>
    </div>
  )
}
export default DefaultContent;