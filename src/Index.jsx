import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App.jsx';
import wgeApp from './reducers/wgeApp.js'
import MapExplorer from './components/MapExplorer.jsx';
import PoweredBy from './components/Powered-by.jsx';
import About from './components/About.jsx';
import Styles from './styles/main.styl'

window.React = React;
let store = createStore(wgeApp)
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}>
        <Route path="/about" component={About}/>
        <Route path="/map" component={MapExplorer}/>
        <Route path="/poweredby" component={PoweredBy}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app-container')
);
