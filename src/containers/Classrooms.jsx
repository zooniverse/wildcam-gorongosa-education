import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createClassroom, fetchClassrooms } from '../actions/classrooms';
import ClassroomsSidebar from '../presentational/ClassroomsSidebar.jsx';


class Classrooms extends Component {

  componentDidMount() {
    if (!this.props.classrooms.data.length && !this.props.classrooms.loading) {
      this.props.dispatch(fetchClassrooms());
    }
  }

  render() {
    return (
      <div className="admin-component">
        <div className="row">
          <ClassroomsSidebar classroomsData={this.props.classrooms} />
          {this.props.children}
        </div>
      </div>
    );
  }

}

Classrooms.propTypes = {
  classrooms: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

Classrooms.defaultProps = {
  classrooms: {
    data: [],
    loading: false,
    error: false,
  }
};

function mapStateToProps(state) {
  return {
    classrooms: state.classrooms,
  };
}
export default connect(mapStateToProps)(Classrooms);
