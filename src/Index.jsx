import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import LoginHandler from './components/container/LoginHandler.jsx';
import MapExplorer from './components/container/MapExplorer.jsx';
import Teachers from './components/container/Teachers.jsx';

import Home from './components/presentational/Home.jsx';
import TeachersDashboard from './components/presentational/TeachersDashboard.jsx';

import Styles from './styles/main.styl';

import configureStore from './store/configureStore';
const store = configureStore();

window.React = React;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="access_token*" component={LoginHandler} />
        <Route path="teachers" component={Teachers}>
          <IndexRoute component={TeachersDashboard} />
          <Route path="data" component={MapExplorer} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app-container')
);

