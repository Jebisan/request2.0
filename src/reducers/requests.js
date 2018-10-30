const requestsReducerDefaultState = [];

export default (state = requestsReducerDefaultState, action) => {

    switch (action.type) {
      case 'ADD_REQUEST':
          return [
            ...state,
            {
              id: action.request.id,
            title: action.request.title,
            artist: action.request.artist,
            likes: [],
            dislikes: []
          }];

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

      default:
        return state;
    }
  };
  