import { Component, PropTypes } from 'react';
import { Link } from 'react-router';


export default function ClassroomsOverview(props, context) {
  return (
    <div>
    ClassroomsOverview. There are {context.classrooms.data.length} classrooms.
    </div>
  );
}

ClassroomsOverview.contextTypes = {
  classrooms: PropTypes.object
}
