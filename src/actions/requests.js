import database from '../firebase/firebase';

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
      dislikes = [],
      createdByUid = '',
      createdByName = '',

    } = requestData;
    const requestObject = { title, artist, likes, dislikes, createdByUid, createdByName};
    return database.ref('requests').push(requestObject).then((ref) => {
    });
  };
};

//LISTENS FOR REQUESTS
export const listenForRequests = () => {
  return (dispatch) => {
    database.ref('requests').on('child_added', data => {
      dispatch(addRequest(
        {
          id: data.key,
          title: data.val().title,
          artist: data.val().artist,
          likes: data.val().likes,
          dislikes: data.val().dislikes,
          createdBy: data.val().createdBy
        }
      ));
      //LISTENS FOR UPDATES
      database.ref('requests').on('child_changed', snapshot => {
        const newRequestObject = {
          ...snapshot.val()
        }
        dispatch(updateRequest(snapshot.key, newRequestObject));
        //dispatch(addLike(likeObj));
      });
    });
  };
}

export const listenForDeletedRequests = () => {
  return (dispatch) => {
    database.ref('requests').on('child_removed', data => {
      dispatch(deleteRequest(data.key));
    });
  };
}



// EDIT_REQUEST
export const updateRequest = (id, newRequestObject) => (
  {
    type: 'UPDATE_REQUEST',
    id,
    newRequestObject
  });


  //DELETE REQUEST
export const deleteRequest = (id) => ({
  type: 'DELETE_REQUEST',
  id
});


export const startDeleteRequest = (id) => {
  return (dispatch) => {
    return database.ref(`requests/${id}`).remove().then(() => {
    });
  };
};