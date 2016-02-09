import React from 'react';
import { connect } from 'react-redux';
import Panoptes from 'panoptes-client';

import StudentsTable from '../presentational/StudentsTable.jsx';


class StudentsContainer extends React.Component{

  render() {
    console.log('Wildcam-Staging: ', Panoptes.apiClient.type('projects').get('937'));
    return (<StudentsTable />);
  }
}

function mapStateToProps(state) {
  return { project: state.project }
}

export default connect(mapStateToProps)(StudentsContainer);
