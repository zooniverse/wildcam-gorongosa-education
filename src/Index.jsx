import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Admin from './components/Admin.jsx';
import App from './components/App.jsx';
import wgeApp from './reducers/wgeApp.js'
import MapExplorer from './components/MapExplorer.jsx';
import Styles from './styles/main.styl';

window.React = React;
let store = createStore(wgeApp)
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}>
        <Route path="/admin" component={Admin}/>
        <Route path="/map" component={MapExplorer}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app-container')
);
