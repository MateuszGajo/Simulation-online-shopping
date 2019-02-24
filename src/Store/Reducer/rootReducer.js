import { combineReducers } from 'redux';
import shopReducer from './shopReducer';
import authReducer from './authReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
    shop: shopReducer,
    auth: authReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
});

export default rootReducer;