import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { createClassroom, fetchClassrooms } from '../actions/classrooms';


class NewClassroomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
      <div>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="col-sm-2 control-label">Name</label>
            <div className="col-sm-10">
              <input className="form-control"
              type="text"
              placeholder="Insert Name"
              autofocus="true"
              value={this.state.name}
              onChange={this.handleChange}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">Subject</label>
            <div className="col-sm-10">
              <input className="form-control"
              type="text"
              placeholder="Subject (Optional)"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
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
