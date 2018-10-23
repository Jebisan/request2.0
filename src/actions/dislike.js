
import database from '../firebase/firebase';


// ADD_DISLIKE
export const addDislike = (dislikedSongId, dislikeUpdates, key) => (
  {
    type: 'ADD_DISLIKE',
    dislikedSongId,
    dislikeUpdates,
    key
  }
  );


  export const startAddDislike = (dislikedSongId, dislikeUpdates) => {
    return (dispatch) => {
     return database.ref(`requests/${dislikedSongId}/${'dislikes'}`).push(dislikeUpdates.uid).then((ref) => {
        dispatch(addDislike(dislikedSongId, dislikeUpdates, ref.key)
        );
      });
    };
  };

//START_REMOVE_LIKE
export const startRemoveDislike = (dislikeData ={}) => {
  return (dispatch) => {
    const {
      dislikedSongId = '',
      dislikeId = '',
    } = dislikeData;
    
    return database.ref(`requests/${dislikedSongId}/${`dislikes`}/${dislikeId}`).remove().then(() => {
      dispatch(removeDislike(dislikedSongId, dislikeId));
    });
    
};

};
    
  // REMOVE_LIKE
  export const removeDislike = (dislikedSongId, dislikeId) => (
    {
      type: 'REMOVE_DISLIKE',
      dislikedSongId,
      dislikeId
    }
    );

    //SET_LIKES
export const setDislikes = (dislikes) => ({
  type: 'SET_DISLIKES', 
  dislikes
  });

export const startSetDislikes = () => {
  return (dispatch) => {
    return database.ref('requests').once('value').then((snapshot) => {
      const dislikes = [];

      snapshot.forEach((childSnapshot) => {
              dislikes.push({
                dislikedSongId: childSnapshot.key,
                dislikes: childSnapshot.val().dislikes
              })})   
         //     console.log(likes);
      dispatch(setDislikes(dislikes));
    });
  };
};

