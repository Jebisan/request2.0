
import database from '../firebase/firebase';

// ADD_LIKE
export const addLike = (likedSongId, likeUpdates, key) => (
  {
    type: 'ADD_LIKE',
    likedSongId,
    likeUpdates,
    key
  }
  );


  export const startAddLike = (likedSongId, likeUpdates) => {
    return (dispatch) => {
     return database.ref(`requests/${likedSongId}/${'likes'}`).push(likeUpdates.uid).then((ref) => {
        dispatch(addLike(likedSongId, likeUpdates, ref.key)
        );
      });
    };
  };

//START_REMOVE_LIKE
export const startRemoveLike = (likeData ={}) => {
  return (dispatch) => {
    const {
      likedSongId = '',
      likeId = '',
    } = likeData;
    
    return database.ref(`requests/${likedSongId}/${`likes`}/${likeId}`).remove().then(() => {
      //console.log("I tried to remove this ID: ",likeId);
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


  //SET_LIKES
export const setLikes = (likes) => ({
  type: 'SET_LIKES', 
  likes
  });

export const startSetLikes = () => {
  return (dispatch) => {
    return database.ref('requests').once('value').then((snapshot) => {
      const likes = [];

      snapshot.forEach((childSnapshot) => {
              likes.push({
                likedSongId: childSnapshot.key,
                likes: childSnapshot.val().likes,
              })})   
         //     console.log(likes);
      dispatch(setLikes(likes));
    });
  };
};

