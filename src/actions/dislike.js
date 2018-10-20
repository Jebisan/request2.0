
import database from '../firebase/firebase';




// ADD_DISLIKE
export const addDislike = (uid) => ({
  type: 'ADD_DISLIKE',
  uid
});


export const startAddDislike = (dislikeData = {}) => {
  return (dispatch) => {
    const {
      dislikedSongId = '',
      uid = '',
    } = dislikeData;
    

   return database.ref(`requests/${dislikedSongId}/${'dislikes'}`).push(uid).then((ref) => {
      dispatch(addDislike(
     uid
      ));
    });
  };
};

  

//REMOVE_DISLIKE
export const startRemoveDislike = (dislikeData ={}) => {
  return (dispatch) => {
    const {
      requestId = '',
      dislikeId = '',
    } = dislikeData;
    
    return database.ref(`requests/${requestId}/${`dislikes`}/${dislikeId}`).remove().then(() => {
      console.log('removing dislike on the id: '+dislikeId);
    });
    
};

};