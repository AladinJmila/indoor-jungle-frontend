import AsyncButton from '../components/AsyncButton';

const NewPlant = () => {
  return (
    <div className='plant-form bg-white'>
      <h2 className='center-self'>Add Plant</h2>
      <form action=''>
        <label>
          <span>name</span>
          <input type='text' />
        </label>
        <label>
          <span>photo</span>
          <input type='file' />
        </label>
        <label>
          <span>added on</span>
          <input type='date' />
        </label>
        <h3 className='center-self'>info</h3>
        <label>
          <span>type</span>
          <input type='text' />
        </label>
        <label>
          <span>native</span>
          <input type='text' />
        </label>
        <label>
          <span>light</span>
          <input type='text' />
        </label>
        <label>
          <span>watering frequency</span>
          <input type='number' />
        </label>
        <h3 className='center-self'>soil</h3>
        <label>
          <span>drainage</span>
          <input type='text' />
        </label>
        <label>
          <span>PH description</span>
          <input type='text' />
        </label>
        <label>
          <span>PH value</span>
          <input type='text' />
        </label>
        <label>
          <span>potting mix</span>
          <input type='text' />
        </label>
        <h3 className='center-self'>care</h3>
        <label>
          <span>discription</span>
          <textarea></textarea>
        </label>
        <label>
          <span>reminder</span>
          <input type='date' />
        </label>
        <AsyncButton label='Add' isPending={false} />
      </form>
    </div>
  );
};

export default NewPlant;
