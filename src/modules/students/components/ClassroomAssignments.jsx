import React, { Component, PropTypes } from 'react';
import SuperDownloadButton from '../../common/components/SuperDownloadButton';
import { DownloadHelper } from '../../../helpers/download.js';
const mapconfig = require('../../../constants/mapExplorer.config.json');

class ClassroomAssignments extends Component {
  constructor(props) {
    super(props);

    this.classificationButtons = {};
    this.aggregationButtons = {};
  }

  downloadMyClassifications(username, assignment_id) {
    return () => {
      const sql =
        'SELECT cla.*, sub.location FROM {CLASSIFICATIONS} as cla LEFT JOIN {SUBJECTS} as sub ON cla.subject_id = sub.subject_id WHERE user_name =\'{WHERE_USER}\' AND workflow_id = {WHERE_WORKFLOW}'
        .replace(/{SUBJECTS}/ig, mapconfig.cartodb.sqlTableSubjects)
        .replace(/{CLASSIFICATIONS}/ig, mapconfig.cartodb.sqlTableClassifications)
        .replace(/{WHERE_USER}/ig, DownloadHelper.sqlStrSafe(username))
        .replace(/{WHERE_WORKFLOW}/ig, parseInt(assignment_id));
      this.classificationButtons[assignment_id].downloadCSV(sql, true);
    }
  }

  downloadAssignmentSubjects(subjects, assignment_id) {
    return () => {
      const where = 'WHERE items.subject_id IN ('+(subjects.join(','))+')';
      const sql =
        mapconfig.cartodb.sqlQueryDownload
        .replace(/{CAMERAS}/ig, mapconfig.cartodb.sqlTableCameras)
        .replace(/{SUBJECTS}/ig, mapconfig.cartodb.sqlTableSubjects)
        .replace(/{AGGREGATIONS}/ig, mapconfig.cartodb.sqlTableAggregations)
        .replace('{WHERE}', where);
      this.aggregationButtons[assignment_id].downloadCSV(sql, true);
    }
  }

  render() {
    const { data, user, token } = this.props;
    return (
    <div className="student-assignmentlist">
      <h1>Assignments</h1>
      <div className="notice">
        Please make sure that you first Sign In at <a href="https://www.wildcamgorongosa.org/" target="_blank" rel="noreferrer noopener">www.wildcamgorongosa.org</a> with the same account before starting an Assignment.
      </div>
      { data.map(classroom =>
        <section key={ classroom.classroom_id }>
          <h3>Classroom { classroom.classroom_name }</h3>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Due date</th>
                <th>Progress</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            { classroom.assignments.map(assignment =>
              <tr key={ assignment.id } className="listitem">
                <td>{ assignment.name }</td>
                <td>{ assignment.description }</td>
                <td>{ assignment.duedate }</td>
                <td>{ assignment.classification_count }/{ assignment.target }</td>
                <td>
                  <a className="btn btn-primary"
                    href={`https://www.wildcamgorongosa.org/#/classify/assignment-${ assignment.id }`}
                    target="_blank"
                    role="button">
                    Start assignment
                  </a>
                  <SuperDownloadButton
                    ref={ele => this.classificationButtons[assignment.id] = ele}
                    onClick={this.downloadMyClassifications(user.display_name, assignment.id)}
                    filename={DownloadHelper.generateFilename('wildcam-my-classifications-')}
                    text="My Data"
                  />
                  <SuperDownloadButton
                    ref={ele => this.aggregationButtons[assignment.id] = ele}
                    onClick={this.downloadAssignmentSubjects(assignment.subjects, assignment.id)}
                    filename={DownloadHelper.generateFilename('wildcam-assignment-subjects-')}
                    text="Public Data"
                  />
                </td>
              </tr>
            ) }
            </tbody>
          </table>
        </section>
      ) }
    </div>
  );
  }
};

export default ClassroomAssignments;
