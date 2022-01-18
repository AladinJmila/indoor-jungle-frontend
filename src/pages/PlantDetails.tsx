import { listenerCount } from 'process';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AsyncButtonWithFunc from '../components/AsyncButtonWithFunc';
import WaterDrop from '../components/WaterDrop';
import useDocument from '../hooks/useDocument';
import useFirestore from '../hooks/useFirestore';
import { getDaysDelta } from './../utilities/functions';

const PlantDetails = () => {
  const { id } = useParams();
  const { document, error } = useDocument('plants', id);
  const { updateDocument, response } = useFirestore('plants');

  const [frequency, setFrequency] = useState(0);

  const handleUpdateFrequency = () => {
    updateDocument(document.id, {
      watering: { ...document.watering, frequency },
    });
  };

  const getNextWateringDate = () => {
    const daysToWater = getDaysDelta(document.watering.nextWatering);
    const nextWatering = new Date();
    nextWatering.setDate(nextWatering.getDate() + daysToWater);
    return nextWatering.toDateString();
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

      <h3 className='mt-2 mb-1'>Watering:</h3>

      <p className='mt-1 mb-1'>Rest frequency:</p>
      <input
        type='number'
        className='mr-2'
        onChange={e => setFrequency(parseInt(e.target.value))}
        value={frequency}
      />
      <AsyncButtonWithFunc
        label='update'
        isPending={response.isPending}
        handler={handleUpdateFrequency}
      />
      <p className='mt-1'>Next Watering: </p>
      <div className='watering-details'>
        <p className='date mr-1'>{getNextWateringDate()},</p>
        <p className='mr-1'>in</p>
        <WaterDrop watering={document.watering} id={document.id} />
        <p className='ml-1'>days</p>
      </div>

      <h3 className='mt-2 mb-1'>Care:</h3>
      <p>{document.care.careDescription}</p>
      <p className='date'>{document.care.reminder.toDate().toDateString()}</p>
    </div>
  );
};

export default PlantDetails;
