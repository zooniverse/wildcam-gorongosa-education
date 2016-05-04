import { Component, PropTypes } from 'react';

export default class CheckboxGroup extends Component {
  constructor(props) {
    super(props);
    this.getCheckboxValues = this.getCheckboxValues.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getCheckboxValues(name) {
    const options = document.getElementsByName(name);
    const values = Array.from(options)
    .filter(option => option.checked)
    .map(option => option.value)
    return values;
  }

  handleChange(e) {
    e.target.value = this.getCheckboxValues(e.target.name);
    this.props.onChange(e);
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

CheckboxGroup.propTypes = {
  options: PropTypes.array.isRequired
}
