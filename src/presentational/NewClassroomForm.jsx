import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import NewClassroomFormElement from './NewClassroomFormElement';

const initialState = {
  name: '',
  subject: '',
  school: '',
  description: '',
};

class NewClassroomForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.state = Object.assign({}, initialState, props.fields );
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.fields);
  }

  handleChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  resetForm() {
    this.setState(initialState);
  }

  handleSubmit(e) {
    e.preventDefault();
    // Avoid polluting the state by creating a new classroom object to submit
    const newClassroom = {};
    for (const key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        newClassroom[key] = this.state[key].trim();
      }
    }
    this.props.submitForm(newClassroom);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <NewClassroomFormElement
          label="Name"
          placeholder="Insert Name"
          autofocus="true"
          value={this.state.name}
          onChange={this.handleChange}
          required="required"
        />

        <NewClassroomFormElement
          label="Subject"
          placeholder="Subject"
          value={this.state.subject}
          onChange={this.handleChange}
        />

        <NewClassroomFormElement
          label="School"
          placeholder="School"
          value={this.state.school}
          onChange={this.handleChange}
        />

        <NewClassroomFormElement
          label="Description"
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleChange}
        />

        <div className="form-group">
          <button type="submit" className="btn btn-primary pull-right">Submit</button>
        </div>

      </form>
    );
  }
}

NewClassroomForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  name: PropTypes.string,
  subject: PropTypes.string,
};

export default NewClassroomForm;
