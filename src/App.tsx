import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import MainCard from './components/MainCard';

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
    <div className='App'>
      <h2>Indoor Jungle</h2>
      {/* <div className='plants'>
        {plants.map(plant => (
          <MainCard key={plant.id} plant={plant} />
        ))}
      </div> */}
    </div>
  );
}

export default App;
