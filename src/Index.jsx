import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import a11y from 'react-a11y';

import App from './containers/App.jsx';
import Home from './presentational/Home.jsx';
import LoginPromptPage from './presentational/LoginPromptPage.jsx';
import ErrorPage from './presentational/ErrorPage.jsx';

import studentRoutes from './modules/students';
import teacherRoutes from './modules/teachers';

import Styles from './styles/main.styl';

import configureStore from './store';
const store = configureStore();

import oauth from 'panoptes-client/lib/oauth';
import config from './constants/config';

import favicon from './images/favicon.ico';

window.React = React;
if (process.env.NODE_ENV === 'staging') {a11y(React)};

oauth.init(config.panoptesAppId)
  .then(function () {
    ReactDOM.render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Home} />
            { teacherRoutes(store) }
            { studentRoutes(store) }
            <Route path="login" component={LoginPromptPage} />
          </Route>
          <Route path="*" component={ErrorPage} />
        </Router>
      </Provider>,
      document.getElementById('app-container')
    );
  });
