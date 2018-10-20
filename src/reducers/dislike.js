// Likes Reducer

const dislikesReducerDefaultState = [];

export default (state = dislikesReducerDefaultState, action) => {
  switch (action.type) {
      case 'ADD_DISLIKE':
      return [
        ...state,
        action.uid
      ];
    default:
      return state;
  }
};
