import '@testing-library/jest-dom/extend-expect';
import { getDaysDelta } from './../../utilities/functions';
import { timestamp } from './../../firebase/config';

describe('Testing utility functions', () => {
  test('getDaysDelta should return the correct difference in days', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const nextWatering = timestamp.fromDate(futureDate);

    const result = getDaysDelta(nextWatering);

    expect(result).toBe(1);
  });
});
