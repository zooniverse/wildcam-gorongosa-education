import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchStudentClassrooms } from '../actions';
import StudentClassroomsSidebar from '../components/StudentClassroomsSidebar.jsx';


class StudentClassroomsContainer extends Component {

  componentDidMount() {
    const { classrooms, dispatch } = this.props;
    if (!classrooms.members.length && !classrooms.data.length && !classrooms.loading) {
      this.props.fetchStudentClassrooms();
    }
  }

  getChildContext() {
    const { classrooms, user } = this.props;
    return {
      classrooms,
      user,
    }
  }

  render() {
    const { children, classrooms } = this.props;
    return (
      <div className="admin-component">
        <div className="row">
          <StudentClassroomsSidebar classroomsData={ classrooms } />
          { children }
        </div>
      </div>
    );
  }

}

StudentClassroomsContainer.propTypes = {
  classrooms: PropTypes.shape({
    data: PropTypes.array.isRequired,
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    members: PropTypes.array.isRequired,
  }),
  user: PropTypes.object.isRequired,
};

StudentClassroomsContainer.defaultProps = {
  classrooms: {
    data: [],
    error: false,
    loading: false,
    members: [],
  },
  user: null,
};

StudentClassroomsContainer.childContextTypes = {
  classrooms: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchStudentClassrooms }, dispatch);

const mapStateToProps = state => ({
  classrooms: state.student.classrooms,
  user: state.login.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentClassroomsContainer);
