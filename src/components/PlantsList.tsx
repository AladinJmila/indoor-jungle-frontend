import useCollection from './../hooks/useCollection';
import PlantCard from './PlantCard';
import { PlantSchema } from './../utilities/interfaces';

const PlantsList = () => {
  const { documents, error }: { documents: PlantSchema[]; error: any } =
    useCollection('plants');

  return (
    <div>
      <div className='row gap-1 justify-center'>
        {documents &&
          documents.map(doc => <PlantCard key={doc.id} doc={doc} />)}
      </div>
    </div>
  );
};

export default PlantsList;
