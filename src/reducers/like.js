// Likes Reducer

const likesReducerDefaultState = [];

export default (state = likesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_LIKE':
      return [
        ...state,
        action.like
      ];
      case 'SET_LIKES': 
      return action.likes;
    default:
      return state;
  }
};
