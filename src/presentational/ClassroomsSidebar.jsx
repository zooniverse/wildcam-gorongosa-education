import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Spinner from 'Spinner.jsx'

export default class ClassroomSidebar extends Component {

  constructor() {
    super();
    this.renderStatusMessage = this.renderStatusMessage.bind(this);
    this.renderClassroomList = this.renderClassroomList.bind(this);
  }

  renderStatusMessage(props) {
    let message = null;
    if (props.loading) {
      message = 'Loading ...';
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
          {(!this.props.userdetails.loading && this.props.userdetails.data.attributes)
          ? <div className="panel-heading clearfix">
              <div className="panel-title pull-left">Classrooms</div>
              {
                (!this.props.userdetails.data.attributes.metadata)
                ? <Link className="btn btn-default pull-right" to="/teachers/classrooms/register">Register</Link>
                : <Link className="btn btn-default pull-right" to="/teachers/classrooms/new">New</Link>
              }
            </div>
          : <Spinner/>}
            { this.renderStatusMessage(data) }
            { this.renderClassroomList(list) }
          </div>

      </div>
    );
  }

}

ClassroomSidebar.propTypes = {
  classroomsData: PropTypes.object.isRequired,
  userdetails: PropTypes.object.isRequired,
};

ClassroomSidebar.defaultProps = {
  userdetails: {
    data: {
      attributes: {
        metadata: {}
      }
    },
    loading: false,
  }
};
