import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import {login, logout } from './actions/auth';
import {startSetRequests} from './actions/requests';
import {startSetLikes} from './actions/like';
import {startSetDislikes} from './actions/dislike';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const getStore = () => {
  console.log(store.getState());
}

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
// <button onClick={getStore}>STORE</button>


let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
   
  }
};



ReactDOM.render(<LoadingPage />, document.getElementById('app'));


firebase.auth().onAuthStateChanged((user) => {
  if(user) {
      //console.log(user.displayName);
      store.dispatch(login(user.uid, user.displayName));

      store.dispatch(startSetRequests()).then(() => {
       store.dispatch(startSetLikes()).then(() => {
        store.dispatch(startSetDislikes()).then(() => {

        
              renderApp();
              if (history.location.pathname === '/') {
                  history.push('/dashboard');
              }
        });
      });
    });

          
  } else {
      store.dispatch(logout());
      renderApp();
      history.push('/');
  }
});