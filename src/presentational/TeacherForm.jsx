import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Dropdown from '../presentational/Dropdown.jsx';
import CheckboxGroup from '../presentational/CheckboxGroup.jsx';
import RadioButtonGroup from '../presentational/RadioButtonGroup.jsx';

import { fetchUserDetails, upsertTeacherMetadata } from '../actions/users';
import { age, boolean, courses, countries, resources, settings } from '../constants/util';

class TeacherForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        attributes: {
          metadata: {
            country: this.props.metadata.country || null,
            setting: this.props.metadata.setting || null,
            age: this.props.metadata.age || null,
            course: this.props.metadata.course || null,
            foundon: this.props.metadata.foundon || null,
            resource: this.props.metadata.resource || null,
            feedback: this.props.metadata.feedback || null,
          }
        }
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hasNullOrEmptyValue = this.hasNullOrEmptyValue.bind(this);
  }

  componentDidMount() {
    const currentUserId = this.props.user.id;
    this.props.dispatch(fetchUserDetails(currentUserId))
  }

  hasNullOrEmptyValue(array){
    return Array.from(array).some(item => item === null || item === '')
  }

  handleChange(e) {
    let nextState = this.state;
    nextState.data.attributes.metadata[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleSubmit(e) {
    e.preventDefault();
    const currentUserId = this.props.user.id;
    Object.assign({}, this.state, {
      data:{
        attributes:{
          metadata: {
            country: e.target[0].value,
            setting: e.target[1].value,
            age: e.target[2].value,
            course: e.target[3].value,
            foundon: e.target[4].value,
            resource: e.target[5].value,
            feedback: e.target[6].value,
          }
        }
      }
    });
    const data = this.state.data;
    const metadata = data.attributes.metadata;
    const values = Object.keys(metadata).map(key => metadata[key]);
    if (!this.hasNullOrEmptyValue(values)) {
      this.props.dispatch(upsertTeacherMetadata(currentUserId, data));
      this.setState({
        data: {
          attributes: {
            metadata: {
              country: this.props.metadata.country || null,
              setting: this.props.metadata.setting || null,
              age: this.props.metadata.age || null,
              course: this.props.metadata.course || null,
              foundon: this.props.metadata.foundon || null,
              resource: this.props.metadata.resource || null,
              feedback: this.props.metadata.feedback || null,
            }
          }
        }
      })
    }
  }

  render() {
    console.log('RENDER!');
    const metadata = this.props.metadata;
    console.log('METADATA: ', this.props.metadata);
    return (
      <div className="col-md-6">
        <div className='page-header'>
          <h1>Registration</h1>
          <p>Before you get started setting up your first classroom, please answer the following questions about how you plan to use WildCam Lab in your teaching.</p>
          <p><em>All fields required. Select all that apply.</em></p>
        </div>
        <form className="teacher-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <Dropdown
              autofocus="true"
              question='Where do you teach?'
              name='country'
              options={countries}
              value={metadata.country}
              onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <CheckboxGroup className="form-control"
              question='In what educational setting do you plan to use this resource?'
              name="setting"
              options={settings}
              value={metadata.setting}
              onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <CheckboxGroup className="form-control"
              question='I plan to use this resource with my students.'
              name="age"
              options={age}
              value={metadata.age}
              onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <CheckboxGroup className="form-control"
              question='In what course(s) do you plan to use this resource?'
              name="course"
              options={courses}
              value={metadata.course}
              onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <CheckboxGroup className="form-control"
              question='How did you find out about this resource?'
              name="foundon"
              options={resources}
              value={metadata.foundon}
              onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <RadioButtonGroup className="form-control"
              question='Have you used HHMI BioInteractive resources other than WildCam Gorongosa in your teaching before?'
              name="resource"
              options={boolean}
              value={metadata.resource}
              onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <RadioButtonGroup className="form-control"
              question='Feedback from educators like you helps us improve our free educational resources. May we contact you at a later time?'
              name="feedback"
              options={boolean}
              value={metadata.feedback}
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

TeacherForm.PropTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.login.user,
    metadata: state.users.data.attributes.metadata
  };
}

export default connect(mapStateToProps)(TeacherForm);
