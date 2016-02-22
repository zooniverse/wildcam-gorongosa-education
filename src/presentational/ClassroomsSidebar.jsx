import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class ClassroomSidebar extends Component {

  constructor() {
    super();
    this.renderStatusMessage = this.renderStatusMessage.bind(this);
    this.renderClassroomList = this.renderClassroomList.bind(this);
  }

  renderStatusMessage(data) {
    let message = null;
    if (data.isFetching) {
      message = 'Loading classrooms...';
    } else if (data.error) {
      message = 'There was an error loading the classrooms :(';
    } else if (data.classrooms && data.classrooms.length === 0) {
      message = 'No classrooms have been created yet.';
    }
    return (message)
      ? (
          <div className="panel-body">
            <p>{message}</p>
          </div>
        )
      : null;
  }

  renderClassroomList(classrooms) {
    const list = (classrooms.length > 0) ? classrooms : [];

    return (
      <div className="list-group">
        <Link className="list-group-item" to="/teachers/classrooms">
          Overview
        </Link>
        { list.map((classroom, i) =>
          <Link
            key={i}
            className="list-group-item"
            to={`/teachers/classrooms/${classroom.id}`}
            >
              {classroom.attributes.name}
          </Link>
        )}
      </div>
    );
  }


  render() {
    const { data } = this.props;
    const { classrooms } = data;

    return (
      <div className="admin-sidebar">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Classrooms</h3>
          </div>
          { this.renderStatusMessage(data) }
          { this.renderClassroomList(classrooms) }
        </div>
      </div>
    );
  }

}

ClassroomSidebar.propTypes = {
  classrooms: PropTypes.array
};
