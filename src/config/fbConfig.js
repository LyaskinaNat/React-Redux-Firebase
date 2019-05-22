//Firebase configuration

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';  

var firebaseConfig = {
    apiKey: "AIzaSyCy2xkdywdnL94zLQnlgfOFsbu9pFfoiwg",
    authDomain: "my-react-redux-app-backend.firebaseapp.com",
    databaseURL: "https://my-react-redux-app-backend.firebaseio.com",
    projectId: "my-react-redux-app-backend",
    storageBucket: "my-react-redux-app-backend.appspot.com",
    messagingSenderId: "635957208956",
    appId: "1:635957208956:web:24b4f15692aaeda9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 // firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 