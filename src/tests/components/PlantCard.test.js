import PlantCard from '../../components/PlantCard';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { timestamp } from './../../firebase/config';

const photoURL =
  'https://firebasestorage.googleapis.com/v0/b/indoor-jungle.appspot.com/o/plantsPhotos%2FfJ78wu6JJnb1Ga7XwhkIULPaYBB2%2Fmonstera%20adansonii.jpg?alt=media&token=544b1f02-131d-4471-9df1-c30bbb32ffba';

const doc = {
  id: 'dfs64krdui',
  name: 'TESTPLANT',
  photo: photoURL,
  watering: {
    frequency: 10,
    nextWatering: timestamp.fromDate(new Date()),
  },
};

let getByTestId;

describe('PlantCard Component', () => {
  beforeEach(() => {
    const component = render(<PlantCard doc={doc} />);
    getByTestId = component.getByTestId;
  });

  describe('WaterDrop Element', () => {
    it('display 0 if the nextWatering date is today', () => {
      const daysToWaterEl = getByTestId('days-to-water');

      expect(daysToWaterEl.textContent).toBe('0');
    });
  });
});
