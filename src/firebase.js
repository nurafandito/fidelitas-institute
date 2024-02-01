import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDgFPSxYj4b5aRXrmE-0XQl0fMQldFXMHM',
  authDomain: 'lms-fidelitas-institute.firebaseapp.com',
  databaseURL: 'https://lms-fidelitas-institute-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'lms-fidelitas-institute',
  storageBucket: 'lms-fidelitas-institute.appspot.com',
  messagingSenderId: '489206934757',
  appId: '1:489206934757:web:411746eb267509c91f380c',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app as firebaseApp, db };
