export default (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
      case 'SET_REQUESTS': 
      return action.requests;
    default:
      return state;
  }
};
