import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createClassroom, fetchClassrooms } from '../actions/classrooms';
import ClassroomsSidebar from '../presentational/ClassroomsSidebar.jsx';


class Classrooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.classrooms.data.length && !this.props.classrooms.loading) {
      this.props.dispatch(fetchClassrooms());
    }
  }

  handleChange(e) {
    this.setState({ name: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    let name = e.target[0].value.trim();
    if (name.length > 0) {
      this.props.dispatch(createClassroom(name));
    }
    this.setState({ name: '' })
  }

  render() {
    return (
      <div className="admin-component">
        <div className="row">
          <form className="input-group" onSubmit={this.handleSubmit}>
            <input className="form-control"
              type="text"
              placeholder="Insert name"
              autofocus="true"
              value={this.state.name}
              onChange={this.handleChange}/>
            <span className="input-group-btn">
              <button type="submit" className="btn btn-primary">Add</button>
            </span>
          </form>
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
