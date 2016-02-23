import { Component, PropTypes } from 'react';


export default class ClassroomList extends Component {

  render() {
    return (
      <div className="list-group">
        { this.props.classrooms.map((name, i) =>
          <a href="#" key={i} className="list-group-item">{name}</a>) }
      </div>
    );
  }

}

ClassroomList.propTypes = {
  classrooms: PropTypes.array.isRequired
};