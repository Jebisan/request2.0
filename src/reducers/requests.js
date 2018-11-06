const requestsReducerDefaultState = [];

export default (state = requestsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_REQUEST':

    //CONVERT LIKES TO ARRAY
    var newLikeArray = []
    action.request.likes? newLikeArray=Object.keys(action.request.likes).map(function(key) {
      return {[key]: action.request.likes[key]};
    }): null ;


    //CONVERT DISLIKES TO ARRAY
    var newDislikeArray = []
    action.request.dislikes? newDislikeArray=Object.keys(action.request.dislikes).map(function(key) {
      return {[key]: action.request.dislikes[key]};
    }): null ;
    
      return [
        ...state,
        {
          id: action.request.id,
          title: action.request.title,
          artist: action.request.artist,
          likes: newLikeArray,
          dislikes: newDislikeArray,
          createdBy: action.request.createdBy
        }
      ];

      case 'UPDATE_REQUEST':
      return state.map((request) => {
        if (request.id === action.id) {

          //CONVERT LIKES TO ARRAY
          var newLikeArray = []
          action.newRequestObject.likes? newLikeArray=Object.keys(action.newRequestObject.likes).map(function(key) {
            return {[key]: action.newRequestObject.likes[key]};
          }): null ;


          //CONVERT DISLIKES TO ARRAY
          var newDislikeArray = []
          action.newRequestObject.dislikes? newDislikeArray=Object.keys(action.newRequestObject.dislikes).map(function(key) {
            return {[key]: action.newRequestObject.dislikes[key]};
          }): null ;
          
          return {
            ...request,
            
              id: action.id,
              title: action.newRequestObject.title,
              artist: action.newRequestObject.artist,
              likes: newLikeArray,
              dislikes: newDislikeArray,
              createdBy: action.newRequestObject.createdBy
            
          };
        } else {
          return request;
        };
      });
      case 'DELETE_REQUEST':
      let filteredRequests =  state.filter(function(request) {
        return request.id !== action.id;
      }); 
      return filteredRequests
    default:
      return state;
  }
};
