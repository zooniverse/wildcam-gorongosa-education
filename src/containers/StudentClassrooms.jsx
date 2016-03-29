import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchStudentClassrooms } from '../actions/classrooms';
import StudentClassroomsSidebar from '../presentational/StudentClassroomsSidebar.jsx';


class StudentClassrooms extends Component {

  componentDidMount() {
    if (!this.props.classrooms.members.length && !this.props.classrooms.data.length && !this.props.classrooms.loading) {
      this.props.dispatch(fetchStudentClassrooms());
    }
  }

  getChildContext() {
    return {
      classrooms: this.props.classrooms
    }
  }

  render() {
    return (
      <div className="admin-component">
        <div className="row">
          <StudentClassroomsSidebar classroomsData={this.props.classrooms} />
          {this.props.children}
        </div>
      </div>
    );
  }

}

StudentClassrooms.propTypes = {
  classrooms: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

StudentClassrooms.defaultProps = {
  classrooms: {
    data: [],
    error: false,
    loading: false,
    members: [],
  }
};

StudentClassrooms.childContextTypes = {
  classrooms: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    classrooms: state.classrooms,
    user: state.login.user
  };
}
export default connect(mapStateToProps)(StudentClassrooms);
