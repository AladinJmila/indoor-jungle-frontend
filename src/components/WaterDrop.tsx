import useFirestore from '../hooks/useFirestore';
import { timestamp } from './../firebase/config';
import waterDropIcon from '../assets/water_drop_icon.svg';

import { Watering } from './../utilities/interfaces';
import { getDaysDelta } from './../utilities/functions';

interface IProps {
  watering: Watering;
  id: string;
}

const WaterDrop: React.FC<IProps> = ({ watering, id }) => {
  const { updateDocument } = useFirestore('plants');

  const daysToWater = getDaysDelta(watering.nextWatering);

  const handleWaterReset = () => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + watering.frequency);
    const nextWatering = timestamp.fromDate(nextDate);

    updateDocument(id, {
      watering: { ...watering, nextWatering },
    });
  };
  return (
    <div className='water-drop' onClick={handleWaterReset}>
      <div className={daysToWater <= 0 ? 'dry' : 'wet'}>
        <img src={waterDropIcon} alt='' />
        <p data-testid='days-to-water'>{daysToWater}</p>
      </div>
    </div>
  );
};

export default WaterDrop;
