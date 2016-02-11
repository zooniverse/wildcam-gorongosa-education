import React from 'react';
import { connect } from 'react-redux';

import StudentsTable from '../presentational/StudentsTable.jsx';


class StudentsContainer extends React.Component{

  render() {

    return (<StudentsTable />);
  }
}

function mapStateToProps(state) {
  return { project: state.project }
}

export default connect(mapStateToProps)(StudentsContainer);