import { PropTypes } from 'react';

const ClassroomsOverview = (props, context) => (
  <div>
    <p>{context.classrooms.data.length} Classrooms.</p>
    <p>{context.classrooms.members.length} Students</p>
  </div>
);

ClassroomsOverview.contextTypes = {
  classrooms: PropTypes.object
}

export {ClassroomsOverview as default}
