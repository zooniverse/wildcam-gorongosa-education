import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Dropdown from 'Dropdown.jsx';
import { getCountries } from '../constants/util';


class TeacherRegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dropDownOnChange = this.dropDownOnChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  dropDownOnChange(change) {
    console.log('Old Value: ' + change.oldValue + '\nNew Value: ' + change.newValue);
  }

  render() {
    const countries = getCountries();
    return (
      <div className="col-md-4">
        <div className='page-header'>
          <h1>Registration</h1>
          <p>Before you get started setting up your first classroom, please answer the following questions about how you plan to use WildCam Lab in your teaching.</p>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
           <label>Where do you teach?</label>
           <Dropdown options={countries}
              value="select"
              labelField="label"
              multiple={true}
              valueField="value"
              onChange={this.dropDownOnChange}
            />
          </div>
          <div className="form-group">
           <button type="submit" className="btn btn-primary pull-right">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}
TeacherRegistrationForm.PropTypes = {
  //expected propTypes go here
}
TeacherRegistrationForm.defaultPropTypes = {
  //default prop values go here
}

export default connect()(TeacherRegistrationForm);
