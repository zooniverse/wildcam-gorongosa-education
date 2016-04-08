import { Component, PropTypes } from 'react';

export default class CheckboxGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: null,
    }
    this.getCheckboxValues = this.getCheckboxValues.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getCheckboxValues(name) {
    const values = [];
    const options = document.getElementsByName(name);
    for (var i = 0; i < options.length; i++) {
      if (options[i].checked) {
        values.push(options[i].value);
      }
    }
    return values;
  }

  handleChange(e) {
    e.target.value = this.getCheckboxValues(e.target.name);
    this.props.onChange(e);
    this.setState({checked: e.target.checked});
  }
  render() {
    const options = this.props.options.map((option) =>
      <li>
        <label>
        <input
          key={option.value}
          name={this.props.name}
          type="checkbox"
          value={option.label}
          onChange={this.handleChange} />
          {option.label}
        </label>
      </li>
    )
    return (
      <div>
        <p>{this.props.question}</p>
        <ul>
          {options}
        </ul>
      </div>

    );
  }
}

CheckboxGroup.defaultProps = {
  question: null,
  name: null,
  onChange: null,
  options: [],
  value: null,
}

CheckboxGroup.PropTypes = {
  options: PropTypes.array.isRequired
}
