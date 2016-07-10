import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import TodoPage from './containers/TodoPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={TodoPage} />
    <Route path="/home" component={HomePage} />
  </Route>
);
