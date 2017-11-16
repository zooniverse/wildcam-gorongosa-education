import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchProgram } from '../actions/program';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchProgram();
  }

  render() {
    console.log('Environment: ' + process.env.NODE_ENV)
    return this.props.children;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProgram: bindActionCreators(fetchProgram, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(App);
