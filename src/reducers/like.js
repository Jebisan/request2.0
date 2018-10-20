// Likes Reducer

const likesReducerDefaultState = [];

export default (state = likesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_LIKE':
      return [
        ...state,
        action.likeObject
      ];
    default:
      return state;
  }
};
