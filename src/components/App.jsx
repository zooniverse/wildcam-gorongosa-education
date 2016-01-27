import React from 'react';
import { connect } from 'react-redux';
import { Link }  from 'react-router';
import packageJSON from '../../package.json';

class App extends React.Component{
//  returnSomething(something) {
//    //this is only for testing purposes. Check /test/components/App-test.js
//    return something;
//  }
  render() {
    const version = packageJSON.version;

    return (
      <div>
        <header className="site-header">
          <h1 className="title">React Starterify {version}</h1>
          <Link to="/about" className="link">About</Link>
          <Link to="/poweredby" className="link">Powered by</Link>
          <Link to="/map" className="link">Map</Link>
        </header>
        <section className="content-section">
          {this.props.children || 'Welcome to React Starterify'}
        </section>
        <footer className="site-footer">
          Placeholder footer, to be replaced. Note the &quot;flex: 0 0 auto&quot;, though.
        </footer>
      </div>
    )
  }
}
export default connect()(App)
