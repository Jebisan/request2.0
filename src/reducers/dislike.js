// Dislikes Reducer

const dislikesReducerDefaultState = [];

export default (state = dislikesReducerDefaultState, action) => {
  switch (action.type) {

    case 'ADD_DISLIKE':
    return state.map((request) => {
      let key = action.key
          if (request.dislikedSongId === action.dislikedSongId) {
            return {
              dislikedSongId: action.dislikedSongId, 
              dislikes: [...request.dislikes, {[key]: action.dislikeUpdates.uid}]
            }
          } else {
            return request;
          };
        });

      case 'REMOVE_DISLIKE':
      return state.map((request) => {
             if (request.dislikedSongId === action.dislikedSongId) {
              var updatedDisLikes = request.dislikes.filter(function(dislike) { 
                  if(Object.keys(dislike)[0]!== action.dislikeId){
                    return dislike
                  }
              });
              const newObj = {
                dislikedSongId: action.dislikedSongId, 
                dislikes: updatedDisLikes
              }   
              return newObj;
            } else {
              return request}
            });
           


      case 'SET_DISLIKES': 
      
      let newFinalArray = [];
      let elements = action.dislikes;

      elements.forEach(element => {
        const newDislikes = [];
        let tempKey =''
        for(const key in element.dislikes) {
          tempKey = key;
          if(element.dislikes.hasOwnProperty(key)) {
              var value = element.dislikes[key];
          }
          newDislikes.push({
            [tempKey]:value}          
            );
      }
      newFinalArray.push({
        dislikedSongId:element.dislikedSongId,
        dislikes: newDislikes
      })
      });
      return newFinalArray;

    default:
      return state;
  }
};
