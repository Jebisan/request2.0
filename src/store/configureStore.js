import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import requestsReducer from '../reducers/requests'
import likesReducerDefaultState from '../reducers/like'
import dislikesReducerDefaultState from '../reducers/dislike'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      requests: requestsReducer,
      likes: likesReducerDefaultState, 
      dislikes: dislikesReducerDefaultState
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
