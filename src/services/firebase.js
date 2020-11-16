import firebase from "firebase";

import "firebase/auth";

  var firebaseConfig = {
    apiKey: "AIzaSyA40ByuoZwdo0hbM9Ixesn2yxyIXIoo3bc",
    authDomain: "gobony-task.firebaseapp.com",
    databaseURL: "https://gobony-task.firebaseio.com",
    projectId: "gobony-task",
    storageBucket: "gobony-task.appspot.com",
    messagingSenderId: "410870279314",
    appId: "1:410870279314:web:19eff0912fdc7877e98a4b"
  };
 
  firebase.initializeApp(firebaseConfig);


  export default firebase;
