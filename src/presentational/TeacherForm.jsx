import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Dropdown from '../presentational/Dropdown.jsx';
import CheckboxGroup from '../presentational/CheckboxGroup.jsx';

import { fetchUserDetails, upsertTeacherMetadata } from '../actions/users';
import { age, courses, countries, resources, settings } from '../constants/util';

class TeacherForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        attributes: {
          metadata: {
            country: this.props.country || '',
            setting: this.props.setting || [],
            age: this.props.age || '',
            course: this.props.course || '',
            foundon: this.props.foundon || '',
            resource: this.props.resource || '',
            feedback: this.props.feedback || '',
          }
        }
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const currentUserId = this.props.user.id;
    this.props.dispatch(fetchUserDetails(currentUserId));
  }


  handleChange(e) {
    let nextState = this.state;
    console.log('name: ', e.target.name)
    console.log('value: ', e.target.value)
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
            country: e.target[0].value.trim(),
            setting: e.target[1].value,
            age: e.target[2].value.trim(),
            course: e.target[3].value.trim(),
            foundon: e.target[4].value.trim(),
            resource: e.target[5].value.trim(),
            feedback: e.target[6].value.trim(),
          }
        }
      }
    });
    const data = this.state.data;
    if (data) {
      this.props.dispatch(upsertTeacherMetadata(
        currentUserId,
        data
      )
    )}
    this.setState({
      data: {
        attributes: {
          metadata: {
            country: '',
            setting: [],
            age: '',
            course: '',
            foundon: '',
            resource: '',
            feedback: '',
          }
        }
      }
    })
  }

  render() {
    return (
      <div className="col-md-4">
        <div className='page-header'>
          <h1>Registration</h1>
          <p>Before you get started setting up your first classroom, please answer the following questions about how you plan to use WildCam Lab in your teaching.</p>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Where do you teach?</label>
            <Dropdown
              autofocus="true"
              required
              name='country'
              options={countries}
              value='default'
              onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label>In what educational setting do you plan to use this resource?</label>
            <CheckboxGroup className="form-control"
              name="setting"
              options={settings}
              required
              value='default'
              onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label>I plan to use this resource with my students.</label>
            <CheckboxGroup className="form-control"
              name="age"
              options={age}
              required
              value=''
              onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label>In what course(s) do you plan to use this resource?</label>
            <CheckboxGroup className="form-control"
              name="course"
              options={courses}
              required
              value=''
              onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label>How did you find out about this resource?</label>
            <input className="form-control"
              type="text"
              name="foundon"
              placeholder="E.g. Zooniverse, Social Media"
              autofocus="true"
              required
              value={this.state.foundon}
              onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label>Have you used HHMI BioInteractive resources other than WildCam Gorongosa in your teaching before?</label>
            <input className="form-control"
              type="text"
              name="resource"
              placeholder="Yes or no"
              autofocus="true"
              required
              value={this.state.resource}
              onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label>Feedback from educators like you helps us improve our free educational resources. May we contact you at a later time?</label>
            <input className="form-control"
              type="text"
              name="feedback"
              placeholder="Yes or no"
              autofocus="true"
              required
              value={this.state.feedback}
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
    user: state.login.user
  };
}

export default connect(mapStateToProps)(TeacherForm);
