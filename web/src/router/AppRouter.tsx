import { Route, Routes, Navigate } from 'react-router-dom'
import { publicRoutes, privateRoutes } from '../router/routes'
import Loader from '../components/Shared/UI/Loader/Loader'
import { useAuth } from '../context/auth/useAuth'
import { NOTES_SECTIONS_PATHS } from '../constants/NotesSectionPaths'

const AppRouter = () => {
    const {isAuth, isLoading} = useAuth()

    if(isLoading) {
        return <Loader/>
    }

    return (
      isAuth
        ?
          <Routes>
            {privateRoutes.map(route => 
                <Route 
                  key={route.path}
                  path={route.path} 
                  element={route.element} 
                />
            )}
            <Route path="*" element={<Navigate to={NOTES_SECTIONS_PATHS.NOTES} replace />} />
          </Routes>
        :
          <Routes>
            {publicRoutes.map(route => 
                <Route 
                  key={route.path}
                  path={route.path} 
                  element={route.element} 
                />
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
    )
}

export default AppRouter;