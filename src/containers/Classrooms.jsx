import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchClassrooms } from '../actions/classrooms';
import ClassroomsSidebar from '../presentational/ClassroomsSidebar.jsx';

class Classrooms extends Component {


  componentDidMount() {
    if (!this.props.classrooms.length && !this.props.isFetching) {
      this.props.dispatch(fetchClassrooms());
    }
  }

  render() {
    return (
      <div className="admin-component">
        <div className="row">
          <ClassroomsSidebar data={this.props.classrooms} />
          {this.props.children}
        </div>
      </div>
    );
  }

}

Classrooms.propTypes = {
  classrooms: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};


Classrooms.defaultProps = {
  classrooms: [],
  isFetching: false,
  error: false,
};

function mapStateToProps(state) {
  return {
    classrooms: state.classrooms.classrooms,
    isFetching: state.classrooms.isFetching,
    error: state.classrooms.error,
  };
}

export default connect(mapStateToProps)(Classrooms);
