import '../src/styles/App.scss';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { AuthProvider } from './context/auth/AuthProvider';

const App = () => {
  return (
    <div className='App'>
      <AuthProvider>
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App;
