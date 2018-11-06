
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
export const startRemoveDislike = (dislikedSongId, dislikeId) => {
  return (dispatch) => {    
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