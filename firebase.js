import * as firebase from 'firebase';
import 'firebase/firebase-firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAPczcqriC2eMKcWMNMvoQCSHY5GvvRGVQ",
  authDomain: "lessonly-5ae13.firebaseapp.com",
  databaseURL: "https://lessonly-5ae13.firebaseio.com",
  projectId: "lessonly-5ae13",
  storageBucket: "lessonly-5ae13.appspot.com",
  messagingSenderId: "946364824551",
  appId: "1:946364824551:web:032e200a4470b162305b42"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

export default firestore;