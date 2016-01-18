import React from 'react';

export default React.createClass({
  render() {
    var classrooms = [
    {
      name: "Classroom1"
    },
    {
      name: "Classroom2"
    },
    {
      name: "Classroom3"
    },
    {
      name: "Classroom4"
    },
    {
      name: "Classroom5"
    },
    {
      name: "Classroom6"
    }
  ];
    var selectRowProp = {
      mode: "checkbox",
      clickToSelect: true,
      bgColor: "rgb(238, 193, 213)"
  };
    return(
      <div className="sidebar">
        <h2>Classrooms</h2>
      </div>

    );

  }



});
