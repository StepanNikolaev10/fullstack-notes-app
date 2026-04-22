import { create } from 'zustand';

interface SidebarStore {
  isSidebarOpened: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const useSidebarStore = create<SidebarStore>()(
  (set) => ({
    isSidebarOpened: false,
    toggleSidebar: () => {
      set(state => ({
        isSidebarOpened: !state.isSidebarOpened
      }));
    },
    closeSidebar: () => {
      set(() => ({
        isSidebarOpened: false
      }));
    }
  })
)

export default useSidebarStore;