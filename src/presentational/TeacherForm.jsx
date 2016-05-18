import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Dropdown from 'Dropdown.jsx';
import CheckboxGroup from 'CheckboxGroup.jsx';
import RadioButtonGroup from 'RadioButtonGroup.jsx';

import { fetchUserDetails, upsertTeacherMetadata } from '../actions/users';
import { age, boolean, courses,   countries, resources, settings } from '../constants/util';

class TeacherForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        attributes: {
          metadata: {
            country: this.props.country || null,
            setting: this.props.setting || null,
            age: this.props.age || null,
            course: this.props.course || null,
            foundon: this.props.foundon || null,
            resource: this.props.resource || null,
            feedback: this.props.feedback || null,
          }
        }
      }
    }
    this.checkArray = this.checkArray.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const currentUserId = this.props.user.id;
    this.props.dispatch(fetchUserDetails(currentUserId));
  }

  checkArray(array){
    return array.some(item => item === null || item === '')
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
    if (!this.checkArray(values)) {
      this.props.dispatch(upsertTeacherMetadata(currentUserId, data));
      this.setState({
        data: {
          attributes: {
            metadata: {
              country: this.props.country || null,
              setting: this.props.setting || null,
              age: this.props.age || null,
              course: this.props.course || null,
              foundon: this.props.foundon || null,
              resource: this.props.resource || null,
              feedback: this.props.feedback || null,
            }
          }
        }
      })
    }
  }

  render() {
    const metadata = this.state.data.attributes;
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
              value='default'
              onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <CheckboxGroup className="form-control"
              question='In what educational setting do you plan to use this resource?'
              name="setting"
              options={settings}
              value='default'
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
              value={metadata.resource}
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

TeacherForm.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.login.user
  };
}

export default connect(mapStateToProps)(TeacherForm);
