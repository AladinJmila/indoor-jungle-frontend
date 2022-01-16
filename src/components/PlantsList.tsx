import useCollection from './../hooks/useCollection';
import PlantCard from './PlantCard';

const PlantsList = () => {
  const { documents, error } = useCollection('plants');

  return (
    <div>
      <div className='row gap-1 justify-center'>
        {documents && documents.map((doc: any) => <PlantCard doc={doc} />)}
      </div>
    </div>
  );
};

export default PlantsList;
