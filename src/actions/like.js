
import database from '../firebase/firebase';

// ADD_LIKE

export const addLike = (likeObject) => ({
    type: 'ADD_LIKE',
    likeObject
  });


  export const startAddLike = (likeData = {}) => {
    return (dispatch) => {
      const {
        likedSongId = '',
        uid = '',
      } = likeData;

     return database.ref(`requests/${likedSongId}/${'likes'}`).push(uid).then((ref) => {
        dispatch(addLike({
       uid
        }));
      });
    };
  };
  



//REMOVE_LIKE
export const startRemoveLike = (likeData ={}) => {
  return (dispatch) => {
    const {
      requestId = '',
      uid = '',
    } = likeData;
    
    return database.ref(`requests/${requestId}/${`likes`}`).remove().then(() => {
      console.log('removing likes on this id: '+requestId);
    });
    
};

};
    
  // REMOVE_LIKE
  export const removeDate = ({ id } = {}) => ({
    type: 'REMOVE_DATE',
    id
  });


  //SET_LIKES
export const setLikes = (likes) => ({
  type: 'SET_LIKES', 
  likes
  });

export const startSetLikes = (uid) => {
  return (dispatch) => {
    return database.ref('requests').once('value').then((snapshot) => {
      const likes = [];

      snapshot.forEach((childSnapshot) => {
              likes.push({
              requestId: childSnapshot.key,
              uid: uid,
              
          });
        
      });
      dispatch(setLikes(likes));
      
    });
  };
};

