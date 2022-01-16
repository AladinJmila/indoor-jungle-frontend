import { Link } from 'react-router-dom';
import waterDropIcon from '../assets/water_drop_icon.svg';
import useFirestore from '../hooks/useFirestore';
import { timestamp } from './../firebase/config';

interface IProps {
  doc: any;
}

const PlantCard: React.FC<IProps> = ({ doc }) => {
  const { updateDocument } = useFirestore('plants');

  const getDaysToWater = () => {
    const today = new Date();
    let nextDate =
      doc.watering.nextWatering &&
      doc.watering.nextWatering.toDate().getTime() - today.getTime();
    return Math.round(nextDate / (1000 * 3600 * 24));
  };

  const handleWaterReset = () => {
    let nextWatering: any = new Date();
    nextWatering.setDate(nextWatering.getDate() + doc.watering.frequency);
    nextWatering = timestamp.fromDate(nextWatering);

    updateDocument(doc.id, {
      watering: { ...doc.watering, nextWatering },
    });
  };

  return (
    <div className='col-8-sm col-4-lg col-3-xl'>
      <div className='nav-card'>
        <Link to=''>
          <div className='card-image'>
            <img src={doc.photo} alt='plant' />
          </div>
          <div className='water-drop' onClick={handleWaterReset}>
            <div className={getDaysToWater() === 0 ? 'dry' : 'wet'}>
              <img src={waterDropIcon} alt='' />
              <p>{getDaysToWater()}</p>
            </div>
          </div>
          <h2 className='card-title'>{doc.name}</h2>
        </Link>
      </div>
    </div>
  );
};

export default PlantCard;
