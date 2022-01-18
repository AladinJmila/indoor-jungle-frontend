import { listenerCount } from 'process';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WaterDrop from '../components/WaterDrop';
import useDocument from '../hooks/useDocument';
import useFirestore from '../hooks/useFirestore';
import { PlantSchema } from './../utilities/interfaces';

const PlantDetails = () => {
  const { id } = useParams();
  const { document, error } = useDocument('plants', id);
  const { updateDocument } = useFirestore('plants');

  const [frequency, setFrequency] = useState(0);

  const handleUpdateFrequency = () => {
    updateDocument(document.id, {
      watering: { ...document.watering, frequency },
    });
  };

  useEffect(() => {
    if (document) {
      setFrequency(document.watering.frequency);
    }
  }, [document]);

  if (error) return <p className='error'>{error}</p>;
  if (!document) return <p className='loading'>loading...</p>;

  return (
    <div className='plant-details-main'>
      <div className='plant-details-base'>
        <img src={document.photo} alt='plant' />
        <div className='info'>
          <h2 className='title'>{document.name}</h2>
          <p className='date'>
            Added on: {document.createdAt.toDate().toDateString()}
          </p>
          <p>Type: {document.type}</p>
          <p>Native: {document.native}</p>
          <p>Light: {document.light}</p>
          <div className='mt-2'>
            <p>soil: {document.soil.soilDescription}</p>
            <p>PH: {document.soil.soilPH}</p>
            <ul>
              potting mix:
              {document.soil.pottingMix.map((mix: any) => (
                <li key={mix}>- {mix}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <h3 className='mt-2'>Watering:</h3>

      <div className='watering-details'>
        <WaterDrop watering={document.watering} id={document.id} />
        <input
          type='number'
          onChange={e => setFrequency(parseInt(e.target.value))}
          value={frequency}
        />
        <button
          className='ml-1 btn-outlined-secondary bg-hover-secondary text-hover-white'
          onClick={handleUpdateFrequency}
        >
          update
        </button>
      </div>

      <h3 className='mt-2'>Care:</h3>
      <p>{document.care.careDescription}</p>
      <p className='date'>{document.care.reminder.toDate().toDateString()}</p>
    </div>
  );
};

export default PlantDetails;
