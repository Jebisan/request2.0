import database from '../firebase/firebase';

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
              requests.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        
      });
      dispatch(setRequests(requests));
      //console.log(requests);
      
    });
  };
};




// ADD_REQUEST
export const addRequest = (request) => ({
  type: 'ADD_REQUEST',
  request
});



export const startAddRequest = (requestData = {}) => {
  return (dispatch) => {
    const {
      title = '0',
      artist = '0',
      likes = [],

    } = requestData; 

    const requestObject = {title, artist, likes};


   return database.ref('requests').push(requestObject).then((ref) => {
      dispatch(addRequest({
        id: ref.key,
        ...requestObject
      }));
    });
  };
};

