
import database from '../firebase/firebase';

// ADD_LIKE
export const addLike = (uid) => ({
    type: 'ADD_LIKE',
    uid
  });


  export const startAddLike = (likeData = {}) => {
    return (dispatch) => {
      const {
        likedSongId = '',
        uid = '',
      } = likeData;
      

     return database.ref(`requests/${likedSongId}/${'likes'}`).push(uid).then((ref) => {
        dispatch(addLike(
       uid
        ));
      });
    };
  };


  



//REMOVE_LIKE
export const startRemoveLike = (likeData ={}) => {
  return (dispatch) => {
    const {
      requestId = '',
      likeId = '',
    } = likeData;
    
    return database.ref(`requests/${requestId}/${`likes`}/${likeId}`).remove().then(() => {
      console.log('removing like on the id: '+likeId);
    });
    
};

};
    
  // REMOVE_LIKE
  export const removeDate = ({ id } = {}) => ({
    type: 'REMOVE_DATE',
    id
  });



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
    


  //SET_LIKES
export const setLikes = (likes) => ({
  type: 'SET_LIKES', 
  likes
  });

export const startSetLikes = (uid) => {
  return (dispatch) => {
    return database.ref('requests').once('value').then((snapshot) => {
      const likes = [];
      const likes2 = [];

      snapshot.forEach((childSnapshot) => {
              likes.push({
                requestId: childSnapshot.key,
                likes: childSnapshot.val().likes    
              }       )})   
      dispatch(setLikes(likes));
      
    });
  };
};

