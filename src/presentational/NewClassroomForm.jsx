import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { createClassroom, fetchClassrooms } from '../actions/classrooms';


class NewClassroomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || '',
      subject: this.props.subject || ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    var nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleSubmit(e) {
    e.preventDefault();
    let name = e.target[0].value.trim();
    if (name.length > 0) {
      this.props.dispatch(createClassroom(name));
    }
    this.setState({ name: '', subject: '' })
  }

  render() {
    return (
      <div className="col-md-4">
        <h3>New Classroom</h3>
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
            <label>Subject</label>
              <input className="form-control"
              type="text"
              name="subject"
              placeholder="Subject (Optional)"
              value={this.state.subject}
              onChange={this.handleChange}/>
          </div>
          <div className="form-group">
              <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
NewClassroomForm.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(NewClassroomForm);
