import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';

import App from './components/App.jsx';
import MapExplorer from './components/MapExplorer.jsx';
import PoweredBy from './components/Powered-by.jsx';
import About from './components/About.jsx';

window.React = React;

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="/about" component={About}/>
      <Route path="/map" component={MapExplorer}/>
      <Route path="/poweredby" component={PoweredBy}/>
    </Route>
  </Router>
  , document.getElementById('app-container')
);
