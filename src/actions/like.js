
import database from '../firebase/firebase';

// ADD_LIKE
export const addLike = (likeObj) => (
  {
    type: 'ADD_LIKE',
    likeObj
  });

  export const startAddLike = (likedSongId, likeUpdates) => {
    return (dispatch) => {
     return database.ref(`requests/${likedSongId}/${'likes'}`).push(likeUpdates.uid).then((ref) => {
      //  dispatch(addLike(likedSongId, likeUpdates, ref.key)
      //  );
      });
    };
  };

//START_REMOVE_LIKE
export const startRemoveLike = (likedSongId, likeId) => {
  return (dispatch) => {    
    return database.ref(`requests/${likedSongId}/${`likes`}/${likeId}`).remove().then(() => {
      dispatch(removeLike(likedSongId, likeId));
    });
};
};
    
  // REMOVE_LIKE
  export const removeLike = (likedSongId, likeId) => (
    {
      type: 'REMOVE_LIKE',
      likedSongId,
      likeId
    }
    );