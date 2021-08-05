import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCRg3FcAKlIpTQ3D-fBU8AxOhVkOC5VoG8",
    authDomain: "netflix-clone-amrit.firebaseapp.com",
    projectId: "netflix-clone-amrit",
    storageBucket: "netflix-clone-amrit.appspot.com",
    messagingSenderId: "867367232519",
    appId: "1:867367232519:web:47f3e274b1a7cfe14836a2"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  const auth = firebase.auth();


  export { auth }
  export default db;