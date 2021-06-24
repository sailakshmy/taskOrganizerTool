import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChB7MM1mFIZlKimdkkahZS58bPhmkvLlQ",
    authDomain: "sheldon-s-task-organizer.firebaseapp.com",
    projectId: "sheldon-s-task-organizer",
    storageBucket: "sheldon-s-task-organizer.appspot.com",
    messagingSenderId: "388662944000",
    appId: "1:388662944000:web:b201507f3c8f99929113e5",
    measurementId: "G-LZ3C814N07"
  };
  
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const db = firebase.firestore();
  export const storage = firebase.storage();
