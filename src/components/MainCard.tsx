import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './MainCard.css';

interface IProps {
  plant: {
    id: number | string;
    name: string;
    native: string;
    soil: string;
    soilPH: { description: string; value: string };
    pottingMix: string[];
    watering: number;
    light: string;
    img: string;
  };
}

const MainCard: React.FC<IProps> = ({ plant }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [daysNum, setDaysNum] = useState(plant.watering);

  const mainDiv = useRef<HTMLImageElement>(null);
  const detailsDiv = useRef<HTMLDivElement>(null);

  const handleClick = async () => {
    if (showDetails) {
      // save in db
    }
    setShowDetails(!showDetails);
  };

  const handleWatering = () => {
    setDaysNum(plant.watering);
  };

  useEffect(() => {
    if (showDetails) {
      detailsDiv.current?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    } else {
      mainDiv.current?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, [showDetails]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDaysNum(e.target.valueAsNumber);
  };

  return (
    <div
      ref={mainDiv}
      className='main-card'
      style={{ flex: showDetails ? '1 0 70%' : '1 0 34%' }}
    >
      <img src={plant.img} alt='plant image' />
      <div className='buttons'>
        <button id='btn1' onClick={handleClick}>
          <b>...</b>
        </button>
        <button
          id='btn2'
          onClick={handleWatering}
          style={{ backgroundColor: daysNum === 0 ? 'red' : '' }}
        >
          <b>{!daysNum ? 0 : daysNum}</b>
        </button>
      </div>
      {showDetails && (
        <div ref={detailsDiv} className='details'>
          <h3>{plant.name}</h3>
          <p>
            <b>Native: </b> {plant.native}
          </p>
          <p>
            <b>Light:</b> {plant.light}
          </p>

          <p>
            <b>Soil:</b> {plant.soil}
          </p>
          <p>
            <b>Soil PH:</b> {plant.soilPH.description} | {plant.soilPH.value}
          </p>
          <div className='watering'>
            <label htmlFor='days'>
              <b>Watering:</b>
            </label>{' '}
            every{' '}
            <input
              onChange={handleChange}
              name='days'
              type='number'
              placeholder='0'
              value={daysNum}
            />{' '}
            days
          </div>
          <div className='potting-mix'>
            <p>
              <b>Potting Mix:</b>
            </p>
            <ul>
              {plant.pottingMix.map(mix => (
                <li key={mix}>{mix}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainCard;
