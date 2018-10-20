
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
        userId = ''
      } = likeData;


     return database.ref(`requests/${likedSongId}/${'likes'}`).push(userId).then((ref) => {
        dispatch(addLike({
            userID: userId
        }));
        console.log(likedSongId);
      });
    };
  };
  