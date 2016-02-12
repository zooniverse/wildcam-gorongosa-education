import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import App from './containers/App.jsx';
import LoginHandler from './containers/LoginHandler.jsx';
import MapExplorer from './containers/MapExplorer.jsx';
import Teachers from './containers/Teachers.jsx';

import Home from './presentational/Home.jsx';
import TeachersDashboard from './presentational/TeachersDashboard.jsx';

import Styles from './styles/main.styl';

import configureStore from './store';
const store = configureStore();

import { oauth } from 'panoptes-client';
import { panoptesAppId } from './constants/config.json';

window.React = React;

oauth.init(panoptesAppId)
  .then(function () {
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
  });
