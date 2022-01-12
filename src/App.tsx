import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Create from './pages/Create';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Plant from './pages/Plant';
import Signup from './pages/Signup';
import useAuthContext from './hooks/useAuthContext';

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <BrowserRouter>
      {authIsReady && (
        <div className='App'>
          <Navbar />
          <Routes>
            <Route
              path='/'
              element={user ? <Dashboard /> : <Navigate to='/login' />}
            />
            <Route
              path='/plants/:id'
              element={user ? <Plant /> : <Navigate to='/login' />}
            />
            <Route
              path='/create'
              element={user ? <Create /> : <Navigate to='/login' />}
            />
            <Route
              path='/signup'
              element={!user ? <Signup /> : <Navigate to='/' />}
            />
            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to='/' />}
            />
            <Route path='*' element={<Dashboard />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
