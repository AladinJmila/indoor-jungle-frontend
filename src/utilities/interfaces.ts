import firebase from 'firebase';

export interface PlantSchema {
  id: string;
  createdAt: firebase.firestore.Timestamp;
  createdBy: string;
  name: string;
  photo: string;
  type: string;
  native: string;
  light: string;
  soil: {
    pottingMix: string[];
    soilDescription: string;
    soilPH: string;
  };
  watering: {
    frequency: number;
    nextWatering: firebase.firestore.Timestamp;
  };
  care: {
    careDescription: string;
    reminder: firebase.firestore.Timestamp;
  };
}

export interface Watering {
  frequency: number;
  nextWatering: firebase.firestore.Timestamp;
}
