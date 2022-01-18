import { FSTimestamp } from '../firebase/config';

export const getDaysDelta = (futureDate: FSTimestamp) => {
  const today = new Date();
  let nextDate = futureDate.toDate().getTime() - today.getTime();
  return Math.round(nextDate / (1000 * 3600 * 24));
};
