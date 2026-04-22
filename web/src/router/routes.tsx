import LandingPage from "../pages/LandingPage";
import NotePage from "../pages/NotePage";
import NotesPage from "../pages/NotesPage";
import AuthPage from "../pages/AuthPage";
import NotesSearchPage from "../pages/NotesSearchPage";
import TrashPage from "../pages/TrashPage";
import ArchivePage from "../pages/ArchivePage";
import { NOTES_SECTIONS_PATHS } from "../constants/NotesSectionPaths";

export const privateRoutes = [
  {path: NOTES_SECTIONS_PATHS.NOTES, element: <NotesPage/>},
  {path: NOTES_SECTIONS_PATHS.ARCHIVE, element: <ArchivePage/>},
  {path: NOTES_SECTIONS_PATHS.TRASH, element: <TrashPage/>},
  {path: `${NOTES_SECTIONS_PATHS.NOTES}/:id`, element: <NotePage/>},
  {path: `${NOTES_SECTIONS_PATHS.ARCHIVE}/:id`, element: <NotePage/>},
  {path: `${NOTES_SECTIONS_PATHS.TRASH}/:id`, element: <NotePage/>},
  {path: `${NOTES_SECTIONS_PATHS.NOTES}/search`, element: <NotesSearchPage/>},
  {path: `${NOTES_SECTIONS_PATHS.ARCHIVE}/search`, element: <NotesSearchPage/>},
]

export const publicRoutes = [
  {path: '/', element: <LandingPage/>},
  {path: '/sign-in', element: <AuthPage pageVariant={'SIGN_IN'}/>},
  {path: '/sign-up', element: <AuthPage pageVariant={'SIGN_UP'}/>},
]
