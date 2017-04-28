import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import Spinner from '../../common/components/Spinner';

class ClassroomSidebar extends Component {

  constructor() {
    super();
    this.renderStatusMessage = this.renderStatusMessage.bind(this);
    this.renderClassroomList = this.renderClassroomList.bind(this);
    
    this.state = {
      showNotice: false
    };
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
        
          <div className="panel panel-notice">
            <h5>Notice: Missing Classrooms and Duplicate Classrooms</h5>
            <h6>28 April 2017</h6>
            {(!this.state.showNotice)
              ? <button className="fa fa-plus" onClick={()=>{this.setState({showNotice: true})}}></button>
              : <div>
                  <p>We've received reports that some Educators had an issue with 'missing classrooms', where Classrooms they created would disappear after they log out and then log in again.</p>
                  <p>A fix has been applied to our database that should resolve this problem, but the result is that previously 'missing' Classrooms would have been 'brought back' - meaning some Educators might see duplicate Classrooms.</p>
                  <p>This should only affect 3% of WildCam Lab's users, and if you're affected, please delete any redundant/duplicate Classrooms that may appear.</p>
                  <p>We apologise for any disruptions to your classrooms, and we hope that the Lab continues to serve your education and research needs. Thank you,</p>
                  <p>- The WildCam Lab team</p>
                </div>
            }
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

export default ClassroomSidebar;
