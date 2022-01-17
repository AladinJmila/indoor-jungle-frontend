import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import PlantForm from './pages/PlantForm';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PlantDetails from './pages/PlantDetails';
import Signup from './pages/Signup';
import useAuthContext from './hooks/useAuthContext';
import Sidebar from './components/Sidebar';
import Utilities from './pages/Utilities';

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <BrowserRouter>
      {authIsReady && (
        <div className='App'>
          {user && <Sidebar />}
          <div className='container'>
            <Navbar />
            <Routes>
              <Route
                path='/'
                element={user ? <Dashboard /> : <Navigate to='/login' />}
              />
              <Route
                path='/plants/:id'
                element={user ? <PlantDetails /> : <Navigate to='/login' />}
              />
              <Route
                path='/create'
                element={user ? <PlantForm /> : <Navigate to='/login' />}
              />
              <Route
                path='/utilities'
                element={user ? <Utilities /> : <Navigate to='/login' />}
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
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
