import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainCard from './components/MainCard';
import Navbar from './components/Navbar';
import Create from './pages/Create';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Plant from './pages/Plant';
import Signup from './pages/Signup';

interface IState {
  plants: {
    id: number | string;
    name: string;
    native: string;
    soil: string;
    soilPH: { description: string; value: string };
    pottingMix: string[];
    watering: {
      interval: number;
      lastWatered: string;
      daysToWater: number;
    };
    light: string;
    img: string;
  }[];
}

const apiEndPoint = 'http://localhost:3000/plants';

function App() {
  const [plants, setPlants] = useState<IState['plants']>([]);

  useEffect(() => {
    const loadPlants = async () => {
      const { data } = await axios.get(apiEndPoint);
      setPlants(data);
    };
    loadPlants();
  }, []);

  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/plants/:id' element={<Plant />} />
          <Route path='/create' element={<Create />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
