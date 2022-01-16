import AsyncButton from '../components/AsyncButton';
import { useRef, useState } from 'react';
import { typesList } from './../utilities/formsData';
import useAuthContext from './../hooks/useAuthContext';
import { projectStorage } from '../firebase/config';
import useFirestore from '../hooks/useFirestore';
import { timestamp } from './../firebase/config';
import { useNavigate } from 'react-router-dom';

const PlantForm = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState('');
  const [native, setNative] = useState('');
  const [light, setLight] = useState('');
  const [waterFrequency, setWaterFrequency] = useState('');
  const [soilDescription, setSoilDescription] = useState('');
  const [soilPH, setSoilPH] = useState('');
  const [newMix, setNewMix] = useState('');
  const [pottingMix, setPottingMix] = useState<string[]>([]);
  const [careDecription, setCareDescription] = useState('');
  const [reminder, setReminder] = useState('');
  const [photoError, setPhotoError] = useState<string | null>(null);

  const { user } = useAuthContext();
  const { addDocument, response } = useFirestore('plants');
  const navigate = useNavigate();

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoto(null);
    let selectedPhoto: any;
    if (e.target.files) {
      selectedPhoto = e.target.files[0];
    }

    if (!selectedPhoto) {
      setPhotoError('Please select a file');
      return;
    }
    if (!selectedPhoto.type.includes('image')) {
      setPhotoError('Selected file must be an image');
      return;
    }
    if (selectedPhoto.size > 500000) {
      setPhotoError('Image file size must be less than 500kb');
      return;
    }

    const uploadPath = `plantsPhotos/${user.uid}/${selectedPhoto.name}`;
    const photo = await projectStorage.ref(uploadPath).put(selectedPhoto);
    const photoURL = await photo.ref.getDownloadURL();

    setPhotoError(null);
    setPhoto(photoURL);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newPlant = {
      createdBy: user.uid,
      name,
      photo,
      type,
      native,
      light,
      watering: {
        frequency: parseInt(waterFrequency),
        lastWatered: null,
        nextWatering: null,
      },
      soil: {
        soilDescription,
        soilPH,
        pottingMix,
      },
      care: {
        careDecription,
        reminder: reminder ? timestamp.fromDate(new Date(reminder)) : null,
      },
    };

    await addDocument(newPlant);
    if (!response.error) navigate('/');
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
          <input type='file' required onChange={handleFileChange} />
        </label>
        {photoError && <p className='text-error'>{photoError}</p>}

        <h3 className='center-self section'>info</h3>
        <label>
          <span>type</span>
          <select name='type' id='' onChange={e => setType(e.target.value)}>
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
            onChange={e => setWaterFrequency(e.target.value)}
            value={waterFrequency}
          />
        </label>
        <h3 className='center-self section'>soil</h3>
        <label>
          <span>description</span>
          <input
            type='text'
            onChange={e => setSoilDescription(e.target.value)}
            value={soilDescription}
          />
        </label>
        <label>
          <span>PH</span>
          <input
            type='text'
            onChange={e => setSoilPH(e.target.value)}
            value={soilPH}
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
              {m} |{' '}
            </em>
          ))}
        </p>

        <h3 className='center-self section'>care</h3>
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
        <AsyncButton label='Submit' isPending={false} />
      </form>
    </div>
  );
};

export default PlantForm;
