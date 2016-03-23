import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Dropdown from 'Dropdown.jsx';
import Checkbox from 'Checkbox.jsx';
import CheckboxStudentsType from 'CheckboxStudentsType.jsx';

import { getCountries, getSettings, getStudentsTypes } from '../constants/util';


class TeacherRegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dropDownOnChange = this.dropDownOnChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  dropDownOnChange(value, change) {
    console.log('Old Value: ' + change.oldValue + '\nNew Value: ' + change.newValue + '\nVALUES: ' + value);
  }

  render() {
    const countries = getCountries();
    const types = getStudentsTypes();
    const typesLabels = types.map((type) => type.label);
    console.log('LABELS: ', typesLabels)
    return (
      <div className="col-md-4">
        <div className='page-header'>
          <h1>Registration</h1>
          <p>Before you get started setting up your first classroom, please answer the following questions about how you plan to use WildCam Lab in your teaching.</p>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
           <label>
             Where do you teach?
            </label>
           <Dropdown options={countries}
              value="select"
              labelField="label"
              valueField="value"
              onChange={this.dropDownOnChange}
            />
          </div>
          <div className="form-group">
            <label>
              In what educational setting do you plan to use this resource? (select all that apply)
            </label>
            <Checkbox/>
          </div>
          <div className="form-group">
            <label>
              I plan to use this resource with my students. (Select all that apply)
            </label>
            <CheckboxStudentsType data={typesLabels}/>
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
