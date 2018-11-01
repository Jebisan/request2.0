const requestsReducerDefaultState = [];

export default (state = requestsReducerDefaultState, action) => {

    switch (action.type) {
      case 'ADD_LIKE':
      return state.map((request) => {
        let key = action.key
            if (request.likedSongId === action.likedSongId) {
              return {
                likedSongId: action.likedSongId, 
                likes: [...request.likes, {[key]: action.likeUpdates.uid}]
              }
            } else {
              return request;
            };
          });
          
      case 'ADD_REQUEST':
      //CONVERTING LIKES TO ARRAY
     const newlikes = [];
     let tempLikeKey =''
      for(const key in action.request.likes) {
        tempLikeKey = key;
        if(action.request.likes.hasOwnProperty(key)) {
            var value = action.request.likes[key];
        }
        newlikes.push({
          [tempLikeKey]:value}          
          );
      }

      //CONVERTING DISLIKES TO ARRAY

      const newdislikes = [];
      let tempDislikeKey =''
       for(const key in action.request.dislikes) {
         tempDislikeKey = key;
         if(action.request.dislikes.hasOwnProperty(key)) {
             var value = action.request.dislikes[key];
         }
         newdislikes.push({
           [tempDislikeKey]:value}          
           );
       }

      return [
            ...state,
            {
              id: action.request.id,
            title: action.request.title,
            artist: action.request.artist,
            likes: newlikes,
            dislikes: newdislikes
          }];


          
/*
        case 'SET_REQUESTS': 
      let newFinalArray = [];
      let elements = action.requests;

      elements.forEach(element => {
        const newlikes = [];
        let tempLikeKey =''
        const newdislikes = [];
        let tempdislikeKey =''

       
        for(const key in element.likes) {
          tempLikeKey = key;
          if(element.likes.hasOwnProperty(key)) {
              var value = element.likes[key];
          }
          newlikes.push({
            [tempLikeKey]:value}          
            );
      }

      for(const key in element.dislikes) {
        tempdislikeKey = key;
        if(element.dislikes.hasOwnProperty(key)) {
            var value = element.dislikes[key];
        }
        newdislikes.push({
          [tempdislikeKey]:value}          
          );
    }


      newFinalArray.push({
        id: element.id,
        title: element.title,
        artist: element.artist,
        likes: newlikes, 
        dislikes: newdislikes
      })
      });
      return newFinalArray;
*/
      default:
        return state;

      
        
    }
  };
  