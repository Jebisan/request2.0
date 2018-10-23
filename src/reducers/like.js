// Likes Reducer

const likesReducerDefaultState = [];

export default (state = likesReducerDefaultState, action) => {
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

      case 'REMOVE_LIKE':
      return state.map((request) => {
             if (request.likedSongId === action.likedSongId) {
              var updatedLikes = request.likes.filter(function(like) { 
                  if(Object.keys(like)[0]!== action.likeId){
                    return like
                  }
              });
              const newObj = {
                likedSongId: action.likedSongId, 
                likes: updatedLikes
              }   
              return newObj;
            } else {
              return request}
            });
           


      case 'SET_LIKES': 
      
      let newFinalArray = [];
      let elements = action.likes;

      elements.forEach(element => {
        const newlikes = [];
        let tempKey =''
        for(const key in element.likes) {
          tempKey = key;
          if(element.likes.hasOwnProperty(key)) {
              var value = element.likes[key];
          }
          newlikes.push({
            [tempKey]:value}          
            );
      }
      newFinalArray.push({
        likedSongId:element.likedSongId,
        likes: newlikes
      })
      });
      return newFinalArray;

    default:
      return state;
  }
};
