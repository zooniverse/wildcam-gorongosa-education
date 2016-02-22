import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchClassrooms } from '../actions/classrooms';
import ClassroomList from '../presentational/ClassroomList.jsx';
import ClassroomListMessage from '../presentational/ClassroomListMessage.jsx';

class Classrooms extends Component {

  constructor() {
    super();
    this.renderClassroomList = this.renderClassroomList.bind(this);
    this.renderStatusMessage = this.renderStatusMessage.bind(this);
  }

  componentDidMount() {
    if (!this.props.classrooms.length && !this.props.isFetching) {
      this.props.dispatch(fetchClassrooms());
    }
  }

  renderClassroomList(classrooms) {
    return (classrooms.length > 0)
      ? (<ClassroomList classrooms={classrooms} />)
      : null;
  }

  renderStatusMessage(props) {
    let message = null;

    if (props.isFetching) {
      message = 'Loading classrooms...';
    } else if (props.error) {
      message = 'There was an error loading the classrooms :(';
    } else if (props.classrooms.length === 0) {
      message = 'No classrooms have been created yet.';
    }
    return (message)
      ? (<ClassroomListMessage message={message} />)
      : null;
  }

  render() {
    const message = this.renderStatusMessage(this.props);
    const classrooms = this.renderClassroomList(this.props.classrooms);
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Classrooms</h3>
        </div>
        {message}
        {classrooms}
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
