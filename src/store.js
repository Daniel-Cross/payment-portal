import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
// Reducers
import NotifyReducer from './reducers/NotifyReducer';
import SettingsReducer from './reducers/SettingsReducer';

const firebaseConfig = {
  apiKey: 'AIzaSyBkHmSGwpa8uGpVw3vWtT4UgoWocc5Ao4k',
  authDomain: 'payment-portal-ecac3.firebaseapp.com',
  databaseURL: 'https://payment-portal-ecac3.firebaseio.com',
  projectId: 'payment-portal-ecac3',
  storageBucket: 'payment-portal-ecac3.appspot.com',
  messagingSenderId: '847153377304'
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

//Init firebase instance
firebase.initializeApp(firebaseConfig);
//Init firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: NotifyReducer,
  settings: SettingsReducer
});

// Create store with reducers and initial state
const initialState = {};

//Create Store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(
      firebase,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
);

export default store;
