import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDMUKoYXcz8qz-MorlBwOFBs1Q4ScvLX_U",
  authDomain: "request-d8f1b.firebaseapp.com",
  databaseURL: "https://request-d8f1b.firebaseio.com",
  projectId: "request-d8f1b",
  storageBucket: "request-d8f1b.appspot.com",
  messagingSenderId: "123104649897"
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

database.ref().on('value', (snapshot) => {
  
 // alert('SOMETHING WAS CHANGED');
});

export { firebase, googleAuthProvider, database as default };
