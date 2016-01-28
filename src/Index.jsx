import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';

import Admin from './components/Admin.jsx';
import App from './components/App.jsx';
import MapExplorer from './components/MapExplorer.jsx';
import Styles from './styles/main.styl'

window.React = React;

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="/map" component={MapExplorer}/>
      <Route path="/admin" component={Admin}/>
    </Route>
  </Router>
  , document.getElementById('app-container')
);
