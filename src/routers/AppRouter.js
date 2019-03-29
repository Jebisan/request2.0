import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import CreateRequest from '../components/CreateRequest';
import PhoneNumber from '../components/PhoneNumber';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute path="/request/" component={LoginPage} exact={true} />

      <PrivateRoute path="/request/phonenumber" component={PhoneNumber}/>
      <PrivateRoute path="/request/dashboard" component={DashboardPage} />
      <PrivateRoute path="/request/createrequest" component={CreateRequest} />

      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

export default AppRouter;
