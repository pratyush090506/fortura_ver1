import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCksMMJqtN9oEUcFFhIRoQt4wzSre6fqtk',
  authDomain: 'fortura-57119.firebaseapp.com',
  projectId: 'fortura-57119',
  storageBucket: 'fortura-57119.appspot.com',
  messagingSenderId: '674823172285',
  appId: '1:674823172285:web:531217d5ecbf9e06ae87d4',
  measurementId: 'G-975JMGF5Z3',
};

const app = initializeApp(firebaseConfig);

export { auth };
