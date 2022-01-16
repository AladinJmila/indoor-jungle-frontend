import { Link } from 'react-router-dom';
import waterDropIcon from '../assets/water_drop_icon.svg';

interface IProps {
  doc: any;
}

const handleWaterReset = () => {
  console.log('clicked');
};

const PlantCard: React.FC<IProps> = ({ doc }) => {
  return (
    <div className='col-8-sm col-4-lg col-3-xl'>
      <div className='nav-card'>
        <Link to=''>
          <div className='card-image'>
            <img src={doc.photo} alt='plant' />
          </div>
          <div className='water-drop' onClick={handleWaterReset}>
            <div className={doc.watering.frequency == 0 ? 'dry' : 'wet'}>
              <img src={waterDropIcon} alt='' />
              <p>{doc.watering.frequency}</p>
            </div>
          </div>
          <h2 className='card-title'>{doc.name}</h2>
        </Link>
      </div>
    </div>
  );
};

export default PlantCard;
