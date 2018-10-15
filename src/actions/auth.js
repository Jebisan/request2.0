import { firebase, googleAuthProvider} from '../firebase/firebase';
import database from '../firebase/firebase';


export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};


//SET_REQUESTS
export const setRequests = (requests) => ({
  type: 'SET_REQUESTS', 
  requests
  });

export const startSetRequests = () => {
  return (dispatch) => {
    return database.ref('requests').once('value').then((snapshot) => {
      const requests = [];

      snapshot.forEach((childSnapshot) => {
          requests.push(
            childSnapshot.val()
          );
      });
      console.log(requests);
      dispatch(setRequests(requests));
    });
  };
};