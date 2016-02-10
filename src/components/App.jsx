import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import { bindActionCreators } from 'redux';


class App extends React.Component {
  render() {
    return this.props.children;
  }
}

App.propTypes = {
  classrooms: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}


function mapStateToProps(state ) {
  console.log('mapStateToProps(state)', state)
  const { allClassrooms } = state;
  const {
    isFetching,
    items: classrooms
  } = allClassrooms || {
    isFetching: true,
    items: []
  }
  return {
    classrooms,
    isFetching
  }
}

export default connect(mapStateToProps)(App);
