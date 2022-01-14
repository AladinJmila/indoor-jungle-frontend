import AsyncButton from '../components/AsyncButton';
import { useRef, useState } from 'react';
import { typesList } from './../utilities/formsData';

const PlantForm = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [addedOn, setAddedOn] = useState('');
  const [type, setType] = useState('');
  const [native, setNative] = useState('');
  const [light, setLight] = useState('');
  const [watering, setWatering] = useState('');
  const [soilDrainage, setSoilDrainage] = useState('');
  const [phDescription, setPhDescription] = useState('');
  const [phValue, setPhValue] = useState('');
  const [newMix, setNewMix] = useState('');
  const [pottingMix, setPottingMix] = useState<string[]>([]);
  const [careDecription, setCareDescription] = useState('');
  const [reminder, setReminder] = useState('');

  const pottingMixInput = useRef<HTMLInputElement>(null);

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const mix = newMix.trim();

    if (mix && !pottingMix.includes(mix)) {
      setPottingMix(prev => [...prev, mix]);
    }
    setNewMix('');
    pottingMixInput.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPlant = {
      name,
      photo,
      addedOn,
      type,
      native,
      light,
      watering,
      soilDrainage,
      phDescription,
      phValue,
      pottingMix,
      careDecription,
      reminder,
    };

    console.log(newPlant);
  };

  return (
    <div className='form plant-form bg-white'>
      <h2 className='center-self'>Add Plant</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>name</span>
          <input
            type='text'
            required
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>photo</span>
          <input
            type='file'
            required
            onChange={e => setPhoto(e.target.value)}
            value={photo}
          />
        </label>
        <label>
          <span>added on</span>
          <input
            type='date'
            required
            onChange={e => setAddedOn(e.target.value)}
            value={addedOn}
          />
        </label>
        <h3 className='center-self'>info</h3>
        <label>
          <span>type</span>
          <select name='type' id=''>
            <option value=''></option>
            {typesList.map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>native</span>
          <input
            type='text'
            onChange={e => setNative(e.target.value)}
            value={native}
          />
        </label>
        <label>
          <span>light</span>
          <input
            type='text'
            onChange={e => setLight(e.target.value)}
            value={light}
          />
        </label>
        <label>
          <span>watering frequency</span>
          <input
            type='number'
            onChange={e => setWatering(e.target.value)}
            value={watering}
          />
        </label>
        <h3 className='center-self'>soil</h3>
        <label>
          <span>drainage</span>
          <input
            type='text'
            onChange={e => setSoilDrainage(e.target.value)}
            value={soilDrainage}
          />
        </label>
        <label>
          <span>PH description</span>
          <input
            type='text'
            onChange={e => setPhDescription(e.target.value)}
            value={phDescription}
          />
        </label>
        <label>
          <span>PH value</span>
          <input
            type='text'
            onChange={e => setPhValue(e.target.value)}
            value={phValue}
          />
        </label>
        <label>
          <span>potting mix</span>
          <div className='input-with-add'>
            <input
              type='text'
              value={newMix}
              ref={pottingMixInput}
              onChange={e => setNewMix(e.target.value)}
            />
            <button
              className='btn-outlined-secondary bg-hover-secondary text-hover-white ml-1'
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </label>
        <p>
          Current mixes:{' '}
          {pottingMix.map(m => (
            <em className='text-secondary' key={m}>
              {m},{' '}
            </em>
          ))}
        </p>

        <h3 className='center-self'>care</h3>
        <label>
          <span>description</span>
          <textarea
            onChange={e => setCareDescription(e.target.value)}
            value={careDecription}
          />
        </label>
        <label>
          <span>reminder</span>
          <input
            type='date'
            onChange={e => setReminder(e.target.value)}
            value={reminder}
          />
        </label>
        <AsyncButton label='Add' isPending={false} />
      </form>
    </div>
  );
};

export default PlantForm;
