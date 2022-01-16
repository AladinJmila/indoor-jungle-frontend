import { listenerCount } from 'process';
import { useParams } from 'react-router-dom';
import useDocument from './../hooks/useDocument';

const Plant = () => {
  const { id } = useParams();
  const { document, error } = useDocument('plants', id);

  if (error) return <p className='error'>{error}</p>;
  if (!document) return <p className='loading'>loading...</p>;

  return (
    <div className='details-main'>
      <div className='details-base'>
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
      <h3 className='mt-2'>Care:</h3>
      <p>{document.care.careDescription}</p>
      <p className='date'>{document.care.reminder.toDate().toDateString()}</p>
    </div>
  );
};

export default Plant;
