import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './components/App.jsx';
import wgeApp from './reducers/wgeApp.js'
import Home from './components/Home.jsx';
import Teachers from './components/Teachers.jsx';
import TeachersDashboard from './components/TeachersDashboard.jsx'
import MapExplorer from './components/MapExplorer.jsx';

import Styles from './styles/main.styl';

window.React = React;
let store = createStore(wgeApp)
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="teachers" component={Teachers}>
          <IndexRoute component={TeachersDashboard}/>
          <Route path="data" component={MapExplorer}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app-container')
);
