
const authReducerDefaultState = [];

export default (state = authReducerDefaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid,
        name: action.name
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};
