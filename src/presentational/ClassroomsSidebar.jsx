import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class ClassroomSidebar extends Component {

  constructor() {
    super();
    this.renderStatusMessage = this.renderStatusMessage.bind(this);
    this.renderClassroomList = this.renderClassroomList.bind(this);
  }

  renderStatusMessage(props) {
    let message = null;
    if (props.loading) {
      message = 'Loading classrooms...';
    } else if (props.error) {
      message = 'There was an error loading the classrooms :(';
    } else if (props.data && props.data.length === 0) {
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

  renderClassroomList(data) {
    const list = (data.length > 0) ? data : [];
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
    const data = this.props.classroomsData;
    const list = data.data; // RENAME!!

    return (
      <div className="admin-sidebar">
        <div className="panel panel-default">
          <div className="panel-heading clearfix">
            <h3 className="panel-title pull-left">Classrooms</h3>
            <Link className="btn btn-default pull-right" to="/teachers/classrooms/new">New</Link>
          </div>
          { this.renderStatusMessage(data) }
          { this.renderClassroomList(list) }
        </div>
      </div>
    );
  }

}

ClassroomSidebar.PropTypes = {
  classroomsData: PropTypes.object.isRequired,
};
