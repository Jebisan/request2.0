export default (state = {}, action) => {
    switch (action.type) {
      case 'ADD_REQUEST':
      return [
        ...state,
        action.request
      ];
        case 'SET_REQUESTS': 
        return action.requests;
      default:
        return state;
    }
  };
  