import useFirestore from '../hooks/useFirestore';
import { timestamp } from './../firebase/config';
import waterDropIcon from '../assets/water_drop_icon.svg';

import { PlantSchema } from './../utilities/interfaces';

interface IProps {
  doc: PlantSchema;
}

const WaterDrop: React.FC<IProps> = ({ doc }) => {
  const { updateDocument } = useFirestore('plants');

  const getDaysToWater = () => {
    const today = new Date();
    let nextDate =
      doc.watering.nextWatering &&
      doc.watering.nextWatering.toDate().getTime() - today.getTime();
    return Math.round(nextDate / (1000 * 3600 * 24));
  };

  const daysToWater = getDaysToWater();

  const handleWaterReset = () => {
    let nextWatering: any = new Date();
    nextWatering.setDate(nextWatering.getDate() + doc.watering.frequency);
    nextWatering = timestamp.fromDate(nextWatering);

    updateDocument(doc.id, {
      watering: { ...doc.watering, nextWatering },
    });
  };
  return (
    <div
      className='water-drop'
      data-testid='water-drop'
      onClick={handleWaterReset}
    >
      <div className={daysToWater <= 0 ? 'dry' : 'wet'}>
        <img src={waterDropIcon} alt='' />
        <p data-testid='days-to-water'>{daysToWater}</p>
      </div>
    </div>
  );
};

export default WaterDrop;
