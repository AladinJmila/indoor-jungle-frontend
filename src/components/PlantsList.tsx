import useCollection from './../hooks/useCollection';

const PlantsList = () => {
  const { documents, error } = useCollection('plants');
  console.log(documents);

  return (
    <div className='row'>
      <h2>Plants List</h2>
      <div className='col-4-xl col-3-lg'>
        {documents &&
          documents.map((doc: any) => (
            <div className='card'>
              <h2>{doc.name}</h2>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlantsList;
