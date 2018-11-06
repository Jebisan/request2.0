// Likes Reducer

const likesReducerDefaultState = [];

export default (state = likesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_LIKE':
      let obj = [];

      obj = [
        ...state,
        {
          likedSongId: action.likeObj.likedSongId,
          likes: action.likeObj.like,
        }
      ];

      var output = [];

      obj.forEach(function (item) {
        //PUSHER FØRST ID'ET
        var existing = output.filter(function (v, i) {
          return v.likedSongId == item.likedSongId;
        });
        //PUSHER DEREFTER LIKES 
        if (existing.length) {
          var existingIndex = output.indexOf(existing[0]);
          output[existingIndex].likes = output[existingIndex].likes.concat({ [action.likeObj.likekey]: item.likes });
        } else {
          if (typeof item.likes == 'string')
            item.likes = [{
              [action.likeObj.likekey]: item.likes
            }
            ];
          output.push(item);
        }

      });
      return output


    case 'REMOVE_LIKE':
      return state.map((request) => {
        if (request.likedSongId === action.likedSongId) {
          var updatedLikes = request.likes.filter(function (like) {
            if (Object.keys(like)[0] !== action.likeId) {
              return like
            }
          });
          const newObj = {
            likedSongId: action.likedSongId,
            likes: updatedLikes
          }
          return newObj;
        } else {
          return request
        }
      });
    default:
      return state;
  }
};
