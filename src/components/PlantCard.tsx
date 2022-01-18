import { Link } from 'react-router-dom';

import { PlantSchema } from './../utilities/interfaces';
import WaterDrop from './WaterDrop';

interface IProps {
  doc: PlantSchema;
}

const PlantCard: React.FC<IProps> = ({ doc }) => {
  return (
    <div className='col-8-sm col-4-lg col-3-xl'>
      <div className='nav-card'>
        <Link to={`plants/${doc.id}`}>
          <div className='card-image'>
            <img src={doc.photo} alt='plant' />
          </div>
        </Link>
        <WaterDrop doc={doc} />
        <h2 className='card-title'>{doc.name}</h2>
      </div>
    </div>
  );
};

export default PlantCard;
