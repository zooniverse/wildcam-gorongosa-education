import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchClassrooms } from '../actions/classrooms';
import ClassroomsSidebar from '../presentational/ClassroomsSidebar.jsx';

class Classrooms extends Component {


  componentDidMount() {
    console.log(this.props)
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
  classrooms: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    classrooms: state.classrooms,
  };
}

export default connect(mapStateToProps)(Classrooms);
