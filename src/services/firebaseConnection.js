import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD2UaDjd8HibwQbuCZ0nzv8ulkMslSFyE8',
  authDomain: 'devlinks-4cb12.firebaseapp.com',
  projectId: 'devlinks-4cb12',
  storageBucket: 'devlinks-4cb12.appspot.com',
  messagingSenderId: '1031622642395',
  appId: '1:1031622642395:web:839aed95f22351e5341afe',
  measurementId: 'G-RPFD40BWMF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
