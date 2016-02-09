import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
<<<<<<< HEAD
import { Provider } from 'react-redux';

import App from './components/App.jsx';

import Home from './components/Home.jsx';
import Teachers from './components/Teachers.jsx';
import TeachersDashboard from './components/TeachersDashboard.jsx';
=======
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers/reducers.js';

import App from './components/App.jsx';
import Home from './components/Home.jsx';
import LoginHandler from './components/LoginHandler.jsx';
>>>>>>> master
import MapExplorer from './components/MapExplorer.jsx';
import Teachers from './components/Teachers.jsx';
import TeachersDashboard from './components/TeachersDashboard.jsx';

import Styles from './styles/main.styl';

import configureStore from './store/configureStore';

const store = configureStore();

window.React = React;
<<<<<<< HEAD
=======
let store = createStore(reducers);
>>>>>>> master

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
