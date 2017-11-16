/*
Notification
------------
This is a temporary, simple, and mostly hardcoded component to communicate
time-specific messages to WildCam Lab's users.
 */

import { Component, PropTypes } from 'react';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    if (!this.state.open) {
      return (
        <div className="closed notification">
          <div className="notification-header">
            <button onClick={() => { this.setState({open: true}) }} className="button" role="button"><i className="fa fa-chevron-down" /></button>
            <span>Planned Maintenance: Wed 6 Dec 2017</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="open notification">
          <div className="notification-header">
            <button onClick={() => { this.setState({open: false}) }} className="button" role="button"><i className="fa fa-chevron-up" /></button>
            <span>Planned Maintenance: Wed 6 Dec 2017</span>
          </div>
          <div className="notification-body">
            <p>On Wed 6 Dec 2017, WildCam Lab will be taken down temporarily for maintenance and upgrades.</p>
            <p>This process is expected to take the whole day (UK time) and will affect teachers and students in the following way:</p>
            <ul>
              <li>Teachers will not be able load/create/manage Classrooms.</li>
              <li>Students will not be able to join Classrooms.</li>
              <li>Students will not be able to participate in Assignments (on WildCam Gorongosa).</li>
            </ul>
            <p>The primary WildCam Gorongosa project itself will remain largely unaffected, and both teachers and students will be able to resume using WildCam Lab the following day.</p>
            <p>Thank you for your understanding.</p>
            <p>- The WildCam Lab team</p>
          </div>
        </div>
      );
    }
  }
}

Notification.propTypes = {};
Notification.defaultProps = {};
export default Notification;
