import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAqipomGDvcg6ROSKG-oo6Kfb9C9Qa2goY',
  authDomain: 'indoor-jungle.firebaseapp.com',
  projectId: 'indoor-jungle',
  storageBucket: 'indoor-jungle.appspot.com',
  messagingSenderId: '84472338468',
  appId: '1:84472338468:web:d27e4d62c85440d8cde0b1',
};

firebase.initializeApp(firebaseConfig);

export const projectAuth = firebase.auth();

export const porjectFirestore = firebase.firestore();
export const timestamp = firebase.firestore.Timestamp;
export const projectStorage = firebase.storage();
