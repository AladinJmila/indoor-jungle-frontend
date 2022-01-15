import { Link } from 'react-router-dom';
import useCollection from './../hooks/useCollection';

const PlantsList = () => {
  const { documents, error } = useCollection('plants');

  return (
    <div>
      <div className='row gap-2 justify-center'>
        {documents &&
          documents.map((doc: any) => (
            <div className='col-8-sm col-4-lg col-3-xl'>
              <div className='nav-card'>
                <Link to=''>
                  <div className='card-image'>
                    <img src={doc.photo} alt='plant' />
                  </div>
                  <h2 className='card-title'>{doc.name}</h2>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlantsList;
