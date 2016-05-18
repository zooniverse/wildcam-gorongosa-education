import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Dropdown from 'Dropdown.jsx';
import CheckboxGroup from 'CheckboxGroup.jsx';

import { createAssignment } from '../actions/teacher';


class NewClassroomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleSubmit(e) {
    e.preventDefault();
    let name = e.target[0].value.trim();

    if (name.length > 0) {
      this.props.dispatch(createAssignment()
    )}
    this.setState({
      name: '',
    })
  }

  render() {
    const classrooms = this.props.classrooms.data ? this.props.classrooms.data : null;
    return (
      <div className="col-md-4">
        <div className='page-header'>
          <h1>New Assignment</h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
           <label>Name</label>
           <input className="form-control"
            type="text"
            name="name"
            placeholder="Insert Name"
            autofocus="true"
            value={this.state.name}
            onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <Dropdown
              autofocus="true"
              question='Classroom'
              name='classroom'
              options={classrooms}
              value='Make a selection'
              onChange={this.handleChange}/>
          </div>
          <div className="form-group">
           <button type="submit" className="btn btn-primary pull-right">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  classrooms: state.teacher.classrooms
});

const mapDispatchToProps = dispatch => ({
  actions: {
    createAssignment: bindActionCreators(createAssignment, dispatch),
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewClassroomForm);
