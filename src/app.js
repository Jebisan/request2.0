import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import {login, logout } from './actions/auth';
import {listenForRequests, listenForDeletedRequests} from './actions/requests';
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

const jsx2 = (
  <div>
  <Provider store={store}>
    <AppRouter />
  </Provider>
  <button onClick={getStore}>GET STORE</button>
  </div>
);


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
  store.dispatch(login(user.uid, user.displayName));
  store.dispatch(listenForRequests());
  store.dispatch(listenForDeletedRequests());
  renderApp();
              if (history.location.pathname === '/request') {
                  history.push('/request/dashboard');
              }

          
  } else {
      store.dispatch(logout());
      renderApp();
      history.push('/request');
  }
});