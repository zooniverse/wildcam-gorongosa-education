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
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleSubmit(e) {
    e.preventDefault();
    let name = e.target[0].value.trim();
    let subject = e.target[1].value.trim();
    let school = e.target[2].value.trim();
    let description = e.target[3].value.trim();
    if (name.length > 0) {
      this.props.dispatch(createClassroom(
        name,
        subject,
        school,
        description
      )
    )}
    this.setState({
      name: '',
      subject: '',
      school  : '',
      description: '',
    })
  }

  render() {
    return (
      <div className="col-md-4">
        <div className='page-header'>
          <h1>New Classroom</h1>
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
           <label>Subject</label>
           <input className="form-control"
            type="text"
            name="subject"
            placeholder="Subject (Optional)"
            value={this.state.subject}
            onChange={this.handleChange}/>
          </div>
          <div className="form-group">
           <label>School</label>
           <input className="form-control"
            type="text"
            name="school"
            placeholder="School (Optional)"
            value={this.state.school}
            onChange={this.handleChange}/>
          </div>
          <div className="form-group">
           <label>Description</label>
           <input className="form-control"
            type="text"
            name="description"
            placeholder="Description (Optional)"
            value={this.state.description}
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
NewClassroomForm.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(NewClassroomForm);
