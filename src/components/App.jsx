import React from 'react';
import { connect } from 'react-redux';
import { Link }  from 'react-router';
import packageJSON from '../../package.json';





class App extends React.Component{
  returnSomething(something) {
    //this is only for testing purposes. Check /test/components/App-test.js
    return something;
  }
  render() {
    const version = packageJSON.version;
    return (
      <div>
        <header className="site-header">
          <h1 className="title">Wildcam Gorongosa Education {version}</h1>
          <Link to="/admin" className="link">Admin</Link>
          <Link to="/map" className="link">Data</Link>
          <Link to="/about" className="link">About</Link>
          <Link to="/poweredby" className="link">Powered by</Link>
        </header>
        <div className="content-section">
          {this.props.children || 'Welcome to React Starterify'}
        </div>
        <footer className="site-footer">
          Placeholder footer, to be replaced. Note the &quot;flex: 0 0 auto&quot;, though.
        </footer>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return { project: state.project }
}
export default connect(mapStateToProps)(App);
