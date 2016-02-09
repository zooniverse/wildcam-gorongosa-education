import React from 'react';
import Classrooms from '../container/Classrooms.jsx';
import { eduApi } from '../../constants/app.config.js';

export default class Sidebar extends React.Component {

  render() {

    return (
      <div className="admin-sidebar">
        <Classrooms source={eduApi.root + eduApi.classrooms}  />
      </div>
    );
  }

}
