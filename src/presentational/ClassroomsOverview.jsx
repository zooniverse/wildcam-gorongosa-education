import { PropTypes } from 'react';

const ClassroomsOverview = (props, context) => (
  <div>
    <p>{(context.classrooms.data) ? context.classrooms.data.length : 0} Classrooms</p>
    <p>{(context.classrooms.members) ? context.classrooms.members.length : 0} Students</p>
  </div>
);

ClassroomsOverview.contextTypes = {
  classrooms: PropTypes.object
}

export {ClassroomsOverview as default}
